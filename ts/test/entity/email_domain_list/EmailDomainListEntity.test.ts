

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_domain_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"dkim_status","req":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"name":"dmarc_status","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"domain","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"productId","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"returnpath_status","req":false,"type":"`$BOOLEAN`","index$":5},{"active":true,"name":"spf_status","req":false,"type":"`$BOOLEAN`","index$":6},{"active":true,"name":"valid","req":false,"type":"`$BOOLEAN`","index$":7}],"id":{"field":"id","name":"id"},"name":"email_domain_list","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"page","orig":"page","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"size","orig":"size","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /email/v1/domains","json":"{\"parameters\":[{\"description\":\"Requested page\",\"in\":\"query\",\"name\":\"page\",\"required\":true,\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"size\",\"required\":true,\"schema\":{\"format\":\"int32\",\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"currentPage\":{\"type\":\"integer\"},\"items\":{\"items\":{\"properties\":{\"dkim_status\":{\"type\":\"boolean\"},\"dmarc_status\":{\"type\":\"string\"},\"domain\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"productId\":{\"type\":\"string\"},\"return-path_status\":{\"type\":\"boolean\"},\"spf_status\":{\"type\":\"boolean\"},\"valid\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"pages\":{\"type\":\"integer\"},\"results\":{\"type\":\"integer\"},\"resultsPerPage\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"message\":{\"description\":\"Error message.\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthenticated\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"message\":{\"description\":\"Error message.\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The requested URL was not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"message\":{\"description\":\"Error message.\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/email/v1/domains","segments":[{"lit":"email"},{"lit":"v1"},{"lit":"domains"}],"select":{"exist":["page","size"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"email_domain_list","name__orig":"email_domain_list","Name":"EmailDomainList","name_":"email_domain_list","name-":"email-domain-list","NAME":"EMAIL_DOMAIN_LIST","index$":2}, {"active":true,"entity":"email_domain_list","key$":"BasicEmailDomainListFlow","kind":"basic","name":"BasicEmailDomainListFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"email_domain_list_ref01"}}],"index$":0}]}, 'EmailDomainList')
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
  
