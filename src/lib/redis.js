/**
 * Created by liuwenzhe on 2018/4/18.
 */
import Redis from 'ioredis'
import config from 'config'

const redisConfig = config.get('redis')

class RedisClient {
  constructor (host, port, password) {
    this.host = host
    this.port = port
    this.password = password
  }

  connect (db = 0) {
    return new Redis({
      host: this.host,
      port: this.port,
      password: this.password,
      db
    })
  }
}

const redisClient = new RedisClient(redisConfig.host, redisConfig.port, redisConfig.password)
const redis = redisClient.connect()

export {
  redis
}
