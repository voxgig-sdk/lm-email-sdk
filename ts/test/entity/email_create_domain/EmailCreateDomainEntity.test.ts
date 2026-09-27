

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


describe('EmailCreateDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmEmailSDK.test()
    const ent = testsdk.EmailCreateDomain()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_create_domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"domain":{"a":true,"h":"Domain","n":"domain","r":true,"sh":"Domain address","t":"`$STRING`","key$":"domain","index$":0}},"name":"email_create_domain","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /email/v1/domains","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/email/v1/domains","q":{},"r":{},"s":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"}],"t":{"req":{"domain":"`reqdata.domain`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"email_create_domain","name__orig":"email_create_domain","Name":"EmailCreateDomain","name_":"email_create_domain","name-":"email-create-domain","NAME":"EMAIL_CREATE_DOMAIN","index$":0}, {"active":true,"entity":"email_create_domain","key$":"BasicEmailCreateDomainFlow","kind":"basic","name":"BasicEmailCreateDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_create_domain_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'EmailCreateDomain', {"POST /email/v1/domains":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["domain"],"type":"object","properties":{"domain":{"minLength":1,"type":"string","description":"Domain address","key$":"domain"}},"additionalProperties":false,"x-ref":"#/components/schemas/EmailCreateDomainRequest","index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const email_create_domain_ref01_ent = client.EmailCreateDomain()
    let email_create_domain_ref01_data = setup.data.new.email_create_domain['email_create_domain_ref01']

    email_create_domain_ref01_data = (await email_create_domain_ref01_ent.create(email_create_domain_ref01_data)).data()
    assert(null != email_create_domain_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email_create_domain/EmailCreateDomainTestData.json')

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
    ['email_create_domain01','email_create_domain02','email_create_domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID': idmap,
    'LM_EMAIL_TEST_LIVE': 'FALSE',
    'LM_EMAIL_TEST_EXPLAIN': 'FALSE',
    'LM_EMAIL_APIKEY': '',
  })

  idmap = env['LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID']

  const live = 'TRUE' === env.LM_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID']
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
  
