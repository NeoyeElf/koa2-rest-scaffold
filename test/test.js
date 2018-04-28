/**
 * Created by liuwenzhe on 2018/4/28.
 */
import request from 'supertest'
import 'should'
import app from '../src'

describe('HTTP APP TEST', () => {
  describe('Koa GET /api/hello', () => {
    it('should 200', (done) => {
      request(app.listen())
        .get('/api/hello')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          code: 0,
          msg: 'ok',
          data: {
            key: 'value'
          }
        }, done)
    })
  })

  describe('Koa GET /api/hello/customError', () => {
    it('should 200', (done) => {
      request(app.listen())
        .get('/api/hello/customError')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          code: 1001,
          msg: 'some custom error msg',
          data: {}
        }, done)
    })
  })

  describe('Koa GET /api/hello/httpError', () => {
    it('should 200', (done) => {
      request(app.listen())
        .get('/api/hello/httpError')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403, {
          code: 403,
          msg: 'forbidden',
          data: {}
        }, done)
    })
  })
})
