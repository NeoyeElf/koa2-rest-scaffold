import Router from 'koa-router'
import helloController from '../controllers/helloController'

const router = Router({
  prefix: '/api'
})

router.use('/hello', helloController.routes())

export default router
