
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LmEmailSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LmEmailSDK.test()
    equal(testsdk instanceof LmEmailSDK, true,
      'LmEmailSDK.test() must return a client synchronously')
  })

})
