'use strict';

// 初始化express框架
var express = require('express')
global.app = express()
log.trace('init express')

// 加载配置文件
for(var item in config.hirott.express) {
    app.set(item, config.hirott.express[item])
}
log.trace('init config')

/*
    cookie-parser

        Parse Cookie header and populate req.cookies with an object keyed by the cookie 
    names. Optionally you may enable signed cookie support by passing a secret string, 
    which assigns req.secret so it may be used by other middleware.

    https://github.com/expressjs/cookie-parser
*/
app.use(require('cookie-parser')())

/*
    express-session

        Session data is not saved in the cookie itself, just the session ID.

    https://github.com/expressjs/session
*/
app.use(require('express-session')({ secret: 'hirojruott' }))

/*
    connect-multiparty

        This middleware will create temp files on your server and never clean them up. 
    Thus you should not add this middleware to all routes; only to the ones in which you 
    want to accept uploads. And in these endpoints, be sure to delete all temp files, 
    even the ones that you don't use.

    https://github.com/andrewrk/connect-multiparty
*/
app.use(require('connect-multiparty')())

/*
    body-parser

        Node.js body parsing middleware.
        This only handles urlencoded and json bodies. For multipart bodies, you may be 
    interested in the following modules:
        busboy and connect-busboy, multiparty and connect-multiparty, formidable, multer
        Other body parsers you might be interested in:
        body, co-body

    https://github.com/expressjs/body-parser
*/
app.use(require('body-parser') ({
        extended: true,
    }))

// 静态解析public目录内的内容
app.use(express.static(__dirname + '/public/'))

// 加载参数检查中间件
app.use(require('./utils/reqcheck')(app))

// 加载用户登录检查中间件
// app.use(require('./utils/usercheck')(app))

// 加载controller
require('./controllers/admin')
require('./controllers/home')
require('./controllers/api')
log.trace('init controllers')

// 开始监听端口
app.listen(config.hirott.port)
log.trace('listenning ' + config.hirott.host + ':' + config.hirott.port)

module.exports.getApp = function() {
    return app
}