

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LmEmailSDK, BaseFeature, stdutil } from '../../..'

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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_domain_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dkim":{"a":true,"h":"Dkim","n":"dkim","r":false,"t":"`$OBJECT`","key$":"dkim","index$":0},"dmarc":{"a":true,"h":"Dmarc","n":"dmarc","r":false,"t":"`$STRING`","key$":"dmarc","index$":1},"domain":{"a":true,"h":"Domain","n":"domain","r":false,"t":"`$STRING`","key$":"domain","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":3},"returnpath":{"a":true,"h":"Returnpath","n":"returnpath","r":false,"t":"`$OBJECT`","key$":"returnpath","index$":4},"spf":{"a":true,"h":"Spf","n":"spf","r":false,"t":"`$OBJECT`","key$":"spf","index$":5},"valid":{"a":true,"h":"Valid","n":"valid","r":false,"t":"`$BOOLEAN`","key$":"valid","index$":6}},"id":{"field":"id","name":"id"},"name":"email_domain_detail","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /email/v1/domains/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/email/v1/domains/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_domain_detail","name__orig":"email_domain_detail","Name":"EmailDomainDetail","name_":"email_domain_detail","name-":"email-domain-detail","NAME":"EMAIL_DOMAIN_DETAIL","index$":1}, {"active":true,"entity":"email_domain_detail","key$":"BasicEmailDomainDetailFlow","kind":"basic","name":"BasicEmailDomainDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_domain_detail_ref01","srcdatavar":"email_domain_detail_ref01_data","suffix":"_dt0"},"m":{"id":"email_domain_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_domain_detail_ref01"}}],"index$":0}]}, 'EmailDomainDetail', {"GET /email/v1/domains/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int32"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_domain_detail_ref01_data = Object.values(setup.data.existing.email_domain_detail)[0] as any

    // LOAD
    const email_domain_detail_ref01_ent = client.EmailDomainDetail()
    const email_domain_detail_ref01_match_dt0: any = {}
    email_domain_detail_ref01_match_dt0.id = email_domain_detail_ref01_data.id
    const email_domain_detail_ref01_data_dt0 = (await email_domain_detail_ref01_ent.load(email_domain_detail_ref01_match_dt0)).data()
    assert(email_domain_detail_ref01_data_dt0.id === email_domain_detail_ref01_data.id)


  })
})



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
  
