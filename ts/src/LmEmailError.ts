
import { Context } from './Context'


class LmEmailError extends Error {

  isLmEmailError = true

  sdk = 'LmEmail'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LmEmailError
}

