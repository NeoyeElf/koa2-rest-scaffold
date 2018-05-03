## koa2 Restful API 脚手架

本项目旨在提供一个纯Restful API server脚手架。
本项目引入了一些koa2&node的常用库，包含路由、参数校验、单元测试、业务逻辑异常处理等特性

项目的由来：本人之前用Java写后台，习惯了throw Exception。使用node koa框架，也找了些网上的koa2脚手架，发现并没有
一个项目能提供优雅的异常处理，故产生了此项目⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄

### 项目运行

- 直接运行 `npm start` 便可启动项目，访问 localhost:7100/api/hello，若看到数据正常返回则说明启动成功；若需要**热更新**，则运行`npm run dev`
- 运行 `npm run build` 会将项目编译至 app 目录下
- 运行 `npm run test` 会执行 test 目录下的测试用例

### 开发使用说明

#### 配置项
引入 [config](https://github.com/lightbend/config) 库作配置项管理，配置项文件统一放在 config 文件夹下面
default.json为默认配置项，本地开发时，直接调整其中参数即可
- test.json 对应 NODE_ENV=test
- production.json 对应 对应 NODE_ENV=production

#### 生成文档

运行命令：
```bash
npm i apidoc -g
npm run docs
```
用浏览器打开./apidoc/index.html

#### 定义返回格式

在 utils/response.js 中定义了数据的返回格式，默认如下：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {}
}
```

#### 优雅地处理错误

在 utils/customError.js 中定义了 CustomError 和 HttpError，在 utils/errorCode.js 中定义了 code 和 msg 的对应关系

- 当你需要抛出业务逻辑错误时，只需`throw new CustomError(1001)`即可
- 若需要抛出 httpcode error，只需`throw new HttpError(401)`即可

可查看 helloController.js 中的示例

#### 主要插件介绍

1. **ioredis 和 mongoose**

由于 Node 项目中经常会用到 redis 和 mongo，所以在本项目中引入了 ioredis 和 mongoose

**如果不需要 ioredis**，那么则运行`npm remove ioredis -S`，然后删除`src/lib/redis.js`文件并移除相应配置项即可

**如果不需要 mongoose**，那么则运行`npm remove mongoose -S`，然后删除`src/models/mongo`目录并移除相应配置项即可

- redis 的使用方法，具体使用方式参考 [ioredis](https://github.com/luin/ioredis)

```javascript
import {
  redis
} from '../lib/redis'

const getRedisData = async () => {
  await redis.set('a', 1)
}
```

- mongo 的使用方法，具体使用方式参考 [mongoose](https://github.com/Automattic/mongoose)

```javascript
import mongoose from 'mongoose'
const User = mongoose.model('User')

const saveMongoData = async () => {
  const user = new User({
      name: 'Tom',
      age: 27
  })
  return await user.save()
}
```

tips: _如果 mongo schema 需要实现继承关系，则可以使用 [mongoose-schema-extend](https://github.com/briankircho/mongoose-schema-extend)_

2. **[koa-validate](https://github.com/RocksonZeta/koa-validate)**

用于请求的参数校验

3. **[lodash](https://github.com/lodash/lodash/)**

一个一致性、模块化、高性能的 JavaScript 实用工具库

4. **[moment](https://github.com/moment/moment/)**

一个优秀的 JavaScript 日期处理类库

### 接下来要做的

- [x] 开发模式下，热更新模式
- [ ] docker build
