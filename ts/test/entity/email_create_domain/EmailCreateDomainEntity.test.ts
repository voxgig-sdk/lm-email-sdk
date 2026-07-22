
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { LmEmailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('EmailCreateDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LMEMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LMEMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmEmailSDK.test()
    const ent = testsdk.EmailCreateDomain()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE
    for (const op of ['create']) {
      if (maybeSkipControl(t, 'entityOp', 'email_create_domain.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const email_create_domain_ref01_ent = client.EmailCreateDomain()
    let email_create_domain_ref01_data = setup.data.new.email_create_domain['email_create_domain_ref01']

    email_create_domain_ref01_data = await email_create_domain_ref01_ent.create(email_create_domain_ref01_data)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID': idmap,
    'LM_EMAIL_TEST_LIVE': 'FALSE',
    'LM_EMAIL_TEST_EXPLAIN': 'FALSE',
    'LM_EMAIL_APIKEY': 'NONE',
  })

  idmap = env['LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID']

  const live = 'TRUE' === env.LM_EMAIL_TEST_LIVE

  if (live) {
    client = new LmEmailSDK(merge([
      {
        apikey: env.LM_EMAIL_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
