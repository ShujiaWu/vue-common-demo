const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')

const mockDir = path.join(process.cwd(), 'mock')

/**
 * 注册路由
 * @param {*} app
 */
function registerRoutes (app) {
  let mockLastIndex
  const { default: mocks } = require('./index.js')
  // 循环注册路由
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.response)
    // 记录最后一个路由的位置
    mockLastIndex = app._router.stack.length
  }
  // 路由的数量
  const mockRoutesLength = Object.keys(mocks).length
  // 返回路由的数量 和 注册了之后堆栈的起始位置
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

/**
 * 清理所有的路由缓存
 */
function unregisterRoutes () {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

module.exports = app => {
  // es6 polyfill
  require('@babel/register')

  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  // 注册路由
  const mockRoutes = registerRoutes(app)
  // 路由的总个数
  var mockRoutesLength = mockRoutes.mockRoutesLength
  // 路由的起始位置
  var mockStartIndex = mockRoutes.mockStartIndex

  // 监控文件的变化，用于热更
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      // 移除所有注册的路由
      app._router.stack.splice(mockStartIndex, mockRoutesLength)
      // 移除所有的路由缓存
      unregisterRoutes()

      // 重新注册路由
      const mockRoutes = registerRoutes(app)
      // 记录路由的总个数 和 路由的起始位置
      mockRoutesLength = mockRoutes.mockRoutesLength
      mockStartIndex = mockRoutes.mockStartIndex

      console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
    }
  })
}
