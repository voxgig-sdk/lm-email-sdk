

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


describe('EmailDomainVerifyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmEmailSDK.test()
    const ent = testsdk.EmailDomainVerify()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LmEmailSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailDomainVerify().load({"domain_id":"x","type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_domain_verify.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"email_domain_verify","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /email/v1/domains/{id}/verify","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/email/v1/domains/{id}/verify","q":{"exist":["domain_id","type"]},"r":{"param":{"id":"domain_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"},{"var":"domain_id"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_domain_verify","name__orig":"email_domain_verify","Name":"EmailDomainVerify","name_":"email_domain_verify","name-":"email-domain-verify","NAME":"EMAIL_DOMAIN_VERIFY","index$":2}, {"active":true,"entity":"email_domain_verify","key$":"BasicEmailDomainVerifyFlow","kind":"basic","name":"BasicEmailDomainVerifyFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"email_domain_verify_ref01","srcdatavar":"email_domain_verify_ref01_data","suffix":"_dt0"},"m":{"id":"email_domain_verify01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_domain_verify_ref01"}}],"unreachable":true}]}, 'EmailDomainVerify', {"GET /email/v1/domains/{id}/verify":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0},{"name":"type","in":"query","required":true,"description":"Verify type","schema":{"maximum":100,"minimum":0,"type":"string","enum":["spf","dmarc","return-path","dkim"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_domain_verify_ref01_data = Object.values(setup.data.existing.email_domain_verify)[0] as any

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
      '../../../../.sdk/test/entity/email_domain_verify/EmailDomainVerifyTestData.json')

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
    ['email_domain_verify01','email_domain_verify02','email_domain_verify03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID': idmap,
    'LM_EMAIL_TEST_LIVE': 'FALSE',
    'LM_EMAIL_TEST_EXPLAIN': 'FALSE',
    'LM_EMAIL_APIKEY': '',
  })

  idmap = env['LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID']

  const live = 'TRUE' === env.LM_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID']
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
  
