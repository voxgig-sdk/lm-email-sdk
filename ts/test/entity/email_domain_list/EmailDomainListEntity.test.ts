

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LmEmailSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EmailDomainListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmEmailSDK.test()
    const ent = testsdk.EmailDomainList()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('email_domain_list hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LmEmailSDK.test(offline).EmailDomainList().stream('list')) { }
    }, /offline/)

    for await (const _item of LmEmailSDK.test(offline).EmailDomainList()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LmEmailSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.EmailDomainList().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LmEmailSDK.test().EmailDomainList().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LmEmailSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.EmailDomainList().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.EmailDomainList().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LmEmailSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailDomainList().list({"page":"x","size":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_domain_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dkim_status":{"a":true,"h":"Dkim Status","n":"dkim_status","r":false,"t":"`$BOOLEAN`","key$":"dkim_status","index$":0},"dmarc_status":{"a":true,"h":"Dmarc Status","n":"dmarc_status","r":false,"t":"`$STRING`","key$":"dmarc_status","index$":1},"domain":{"a":true,"h":"Domain","n":"domain","r":false,"t":"`$STRING`","key$":"domain","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":3},"productId":{"a":true,"h":"Product Id","n":"productId","r":false,"t":"`$STRING`","key$":"productId","index$":4},"returnpath_status":{"a":true,"h":"Returnpath Status","n":"returnpath_status","r":false,"t":"`$BOOLEAN`","key$":"returnpath_status","index$":5},"spf_status":{"a":true,"h":"Spf Status","n":"spf_status","r":false,"t":"`$BOOLEAN`","key$":"spf_status","index$":6},"valid":{"a":true,"h":"Valid","n":"valid","r":false,"t":"`$BOOLEAN`","key$":"valid","index$":7}},"id":{"field":"id","name":"id"},"name":"email_domain_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /email/v1/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"page","or":"page","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"size","or":"size","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/email/v1/domains","q":{"exist":["page","size"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"email_domain_list","name__orig":"email_domain_list","Name":"EmailDomainList","name_":"email_domain_list","name-":"email-domain-list","NAME":"EMAIL_DOMAIN_LIST","index$":1}, {"active":true,"entity":"email_domain_list","key$":"BasicEmailDomainListFlow","kind":"basic","name":"BasicEmailDomainListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"email_domain_list_ref01"}}],"index$":0}]}, 'EmailDomainList', {"GET /email/v1/domains":{"protocol":"http","parameters":[{"name":"page","in":"query","required":true,"description":"Requested page","schema":{"type":"integer","format":"int32"},"index$":0},{"name":"size","in":"query","required":true,"description":"Number of items per page","schema":{"maximum":100,"minimum":0,"type":"integer","format":"int32"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_domain_list_ref01_data = Object.values(setup.data.existing.email_domain_list)[0] as any

    // LIST
    const email_domain_list_ref01_ent = client.EmailDomainList()
    const email_domain_list_ref01_match: any = {}

    const email_domain_list_ref01_list = (await email_domain_list_ref01_ent.list(email_domain_list_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email_domain_list/EmailDomainListTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LmEmailSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['email_domain_list01','email_domain_list02','email_domain_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_EMAIL_TEST_EMAIL_DOMAIN_LIST_ENTID': idmap,
    'LM_EMAIL_TEST_LIVE': 'FALSE',
    'LM_EMAIL_TEST_EXPLAIN': 'FALSE',
    'LM_EMAIL_APIKEY': '',
  })

  idmap = env['LM_EMAIL_TEST_EMAIL_DOMAIN_LIST_ENTID']

  const live = 'TRUE' === env.LM_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_EMAIL_TEST_EMAIL_DOMAIN_LIST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LmEmailSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.LM_EMAIL_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LM_EMAIL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
