/**
 * Created by liuwenzhe on 2018/4/24.
 */

const format = (data, code = 0, msg = 'ok') => {
  return {
    code,
    msg,
    data
  }
}

export {
  format
}
