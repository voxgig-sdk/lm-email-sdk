

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


describe('EmailDomainDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmEmailSDK.test()
    const ent = testsdk.EmailDomainDetail()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('email_domain_detail hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LmEmailSDK.test(offline).EmailDomainDetail().stream('list')) { }
    }, /offline/)

    for await (const _item of LmEmailSDK.test(offline).EmailDomainDetail()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LmEmailSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.EmailDomainDetail().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LmEmailSDK.test().EmailDomainDetail().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LmEmailSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.EmailDomainDetail().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.EmailDomainDetail().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LmEmailSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailDomainDetail().list({"page":"x","size":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_domain_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dkim":{"a":true,"h":"Dkim","n":"dkim","r":false,"t":"`$OBJECT`","key$":"dkim","index$":0},"dkim_status":{"a":true,"h":"Dkim Status","n":"dkim_status","r":false,"t":"`$BOOLEAN`","key$":"dkim_status","index$":1},"dmarc":{"a":true,"h":"Dmarc","n":"dmarc","r":false,"t":"`$STRING`","key$":"dmarc","index$":2},"dmarc_status":{"a":true,"h":"Dmarc Status","n":"dmarc_status","r":false,"t":"`$STRING`","key$":"dmarc_status","index$":3},"domain":{"a":true,"h":"Domain","n":"domain","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Domain address","t":"`$STRING`","key$":"domain","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":5},"productId":{"a":true,"h":"Product Id","n":"productId","r":false,"t":"`$STRING`","key$":"productId","index$":6},"returnpath":{"a":true,"h":"Returnpath","n":"returnpath","r":false,"t":"`$OBJECT`","key$":"returnpath","index$":7},"returnpath_status":{"a":true,"h":"Returnpath Status","n":"returnpath_status","r":false,"t":"`$BOOLEAN`","key$":"returnpath_status","index$":8},"spf":{"a":true,"h":"Spf","n":"spf","r":false,"t":"`$OBJECT`","key$":"spf","index$":9},"spf_status":{"a":true,"h":"Spf Status","n":"spf_status","r":false,"t":"`$BOOLEAN`","key$":"spf_status","index$":10},"valid":{"a":true,"h":"Valid","n":"valid","r":false,"t":"`$BOOLEAN`","key$":"valid","index$":11}},"id":{"field":"id","name":"id"},"name":"email_domain_detail","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["domain"],"co":{"id":"POST /email/v1/domains","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/email/v1/domains","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"}],"t":{"req":{"domain":"`reqdata.domain`"},"res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /email/v1/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"page","or":"page","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"size","or":"size","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/email/v1/domains","q":{"exist":["page","size"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /email/v1/domains/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/email/v1/domains/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_domain_detail","name__orig":"email_domain_detail","Name":"EmailDomainDetail","name_":"email_domain_detail","name-":"email-domain-detail","NAME":"EMAIL_DOMAIN_DETAIL","index$":0}, {"active":true,"entity":"email_domain_detail","key$":"BasicEmailDomainDetailFlow","kind":"basic","name":"BasicEmailDomainDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_domain_detail_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"email_domain_detail_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"email_domain_detail_ref01","srcdatavar":"email_domain_detail_ref01_data","suffix":"_dt0"},"m":{"id":"email_domain_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_domain_detail_ref01"}}],"index$":2}]}, 'EmailDomainDetail', {"POST /email/v1/domains":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["domain"],"type":"object","properties":{"domain":{"minLength":1,"type":"string","description":"Domain address","key$":"domain"}},"additionalProperties":false,"x-ref":"#/components/schemas/EmailCreateDomainRequest","index$":1}}}},"parameters":[]},"GET /email/v1/domains":{"protocol":"http","parameters":[{"name":"page","in":"query","required":true,"description":"Requested page","schema":{"type":"integer","format":"int32"},"index$":0},{"name":"size","in":"query","required":true,"description":"Number of items per page","schema":{"maximum":100,"minimum":0,"type":"integer","format":"int32"},"index$":1}]},"GET /email/v1/domains/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const email_domain_detail_ref01_ent = client.EmailDomainDetail()
    let email_domain_detail_ref01_data = setup.data.new.email_domain_detail['email_domain_detail_ref01']

    email_domain_detail_ref01_data = (await email_domain_detail_ref01_ent.create(email_domain_detail_ref01_data)).data()
    assert(null != email_domain_detail_ref01_data.id)


    // LIST
    const email_domain_detail_ref01_match: any = {}

    const email_domain_detail_ref01_list = (await email_domain_detail_ref01_ent.list(email_domain_detail_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(email_domain_detail_ref01_list, { id: email_domain_detail_ref01_data.id })))


    // LOAD
    const email_domain_detail_ref01_match_dt0: any = {}
    email_domain_detail_ref01_match_dt0.id = email_domain_detail_ref01_data.id
    const email_domain_detail_ref01_data_dt0 = (await email_domain_detail_ref01_ent.load(email_domain_detail_ref01_match_dt0)).data()
    assert(email_domain_detail_ref01_data_dt0.id === email_domain_detail_ref01_data.id)


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
      '../../../../.sdk/test/entity/email_domain_detail/EmailDomainDetailTestData.json')

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
    ['email_domain_detail01','email_domain_detail02','email_domain_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID': idmap,
    'LM_EMAIL_TEST_LIVE': 'FALSE',
    'LM_EMAIL_TEST_EXPLAIN': 'FALSE',
    'LM_EMAIL_APIKEY': '',
  })

  idmap = env['LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID']

  const live = 'TRUE' === env.LM_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID']
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
  
