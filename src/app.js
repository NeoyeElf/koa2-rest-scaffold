import http from 'http'
import Koa from 'koa'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import config from 'config'
import {
  CustomError,
  HttpError
} from './utils/customError'
import {
  format
} from './utils/response'

const constants = require('./utils/constants')
require('./models/mongo')

const app = new Koa()
const bodyparser = Bodyparser()

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))

app.use((ctx, next) => {
  return next().catch((err) => {
    let code = 500
    let msg = 'unknown error'

    if (err instanceof CustomError || err instanceof HttpError) {
      const res = err.getCodeMsg()
      ctx.status = err instanceof HttpError ? res.code : 200
      code = res.code
      msg = res.msg
    } else {
      ctx.status = code
      console.error('err', err)
    }
    ctx.body = format({}, code, msg)
  })
})

// check request param
require('koa-validate')(app)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  await next()
  ctx.body = format(ctx.body)
})

// response router
app.use(async (ctx, next) => {
  await require('./routes').routes()(ctx, next)
})

// 404
app.use(async () => {
  throw new HttpError(constants.HTTP_CODE.NOT_FOUND)
})

// error logger
app.on('error', async (err, ctx) => {
  console.error('error occured:', err)
})

const port = config.get('application.port') || '3000'
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(port + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
})
server.on('listening', () => {
  console.log('Listening on port: %d', port)
})

export default app
