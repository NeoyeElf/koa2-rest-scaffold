/**
 * Created by liuwenzhe on 2018/4/16.
 */
import Router from 'koa-router'
import {
  CustomError,
  HttpError
} from '../utils/customError'
import constants from '../utils/constants'

const router = Router()

/**
 * @api {get} /hello 测试接口
 * @apiGroup Test
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *    {
 *        "code": 0,
 *        "msg": "ok",
 *        "data": {
 *            "key": "value"
 *        }
 *    }
 */
router.get('/', (ctx, next) => {
  ctx.body = {
    key: 'value'
  }
})

router.get('/customError', (ctx, next) => {
  throw new CustomError(constants.CUSTOM_CODE.SOME_CUSTOM_ERROR)
})

router.get('/httpError', (ctx, next) => {
  throw new HttpError(constants.HTTP_CODE.FORBIDDEN)
})

export default router
