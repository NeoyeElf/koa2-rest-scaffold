/**
 * Created by liuwenzhe on 2018/4/16.
 */
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import config from 'config'

mongoose.Promise = Promise
// 加载mongoose模型
const files = fs.readdirSync(path.join(__dirname, 'schema'))
for (let file of files) {
  if (file === 'base') {
    continue
  }
  require(`./schema/${file}`)
}

const mongoConfig = config.get('mongo')

const options = {
  // Don't build indexes
  autoIndex: false,
  // Never stop trying to reconnect
  reconnectTries: Number.MAX_VALUE,
  // Reconnect every 1000ms
  reconnectInterval: 1000,
  // Maintain up to 10 socket connections
  poolSize: 10,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  keepAlive: 120,
  user: mongoConfig.user || '',
  pass: mongoConfig.pass || ''
}

mongoose.connect(mongoConfig.uri, options, function (err) {
  if (err) {
    console.error('mongo connect err', err)
  }
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})
mongoose.connection.on('disconnected', (err) => {
  console.error(err)
})
