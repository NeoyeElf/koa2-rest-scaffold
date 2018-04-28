/**
 * Created by liuwenzhe on 2018/4/23.
 */
import moment from 'moment'

const saveLog = () => {
  return (ctx, next) => {
    const ip = ctx.request.get('X-Forwarded-For') || ctx.request.get('X-Real-IP')
    const bodyParams = ctx.req.body || ctx.request.body
    const logData = {
      'url': ctx.originalUrl,
      'request_method': ctx.request.method,
      'json_body': bodyParams ? JSON.stringify(bodyParams) : '',
      'ip': ip,
      'time': moment().format('YYYY-MM-DD HH:mm:ss'),
      'agent': ctx.request.header['user-agent']
    }

    console.log('access log -- ', logData)
  }
}

export {saveLog}
