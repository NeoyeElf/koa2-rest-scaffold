/**
 * Created by liuwenzhe on 2018/4/24.
 */
import util from 'util'
import ERROR_MSG from './errorMsg'
import constants from './constants'

const HTTP_CODE = constants.HTTP_CODE

function CustomError (code, msg) {
  Error.call(this, '')

  this.code = code
  this.msg = msg || ERROR_MSG[code] || 'unknown error'

  this.getCodeMsg = function () {
    return {
      code: this.code,
      msg: this.msg
    }
  }
}
util.inherits(CustomError, Error)

function HttpError (code, msg) {
  if (Object.values(HTTP_CODE).indexOf(code) < 0) {
    throw Error('not an invalid http code')
  }

  CustomError.call(this, code, msg)
}
util.inherits(HttpError, CustomError)

export {
  HttpError,
  CustomError
}
