'use strict';

var reqtable = { }

var typetable = {
    'number' : /[0-9]+/,
    'id' : /[a-zA-Z0-9_]+/,
    'password' : /[a-zA-Z0-9_]{4,18}/,
    'line' : /.+/,
    'date' : /^[0-9]{4}-((0[0-9]|(1[0-2])))-([0-2][0-9]|(3[0-1]))$/,  // yyyy-MM-dd
    'time' : /^((0[0-9])|(1[0-2])|(2[0-3]))(:(([0-5][0-9])|60)){2}$/,
    'datetime' : /^[0-9]{4}-((0[0-9]|(1[0-2])))-([0-2][0-9]|(3[0-1]))\s((0[0-9])|(1[0-2])|(2[0-3]))(:(([0-5][0-9])|60)){2}$/,
    'email' : /^[a-zA-Z0-9_+.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,3}){1,2}$/
}

var handler = function(req, options) {
    var obj
    // GET请求和POST请求的参数解析地方不一样
    if (req.method === 'GET') {
        obj = req.query
    }
    else {
        obj = req.body
    }

    if (options.params !== undefined) {
        // 构造新的参数结构
        req.cparam = {}
        // 遍历参数配置
        for(var paramname in options.params) {
            // 请求中是否存在当前参数
            if (obj[paramname] === undefined) {
                //是否存在缺省值
                if (options.params[paramname].default === undefined) {
                    return true
                }
                else {
                    req.cparam[paramname] = options.params[paramname].default
                }
            }
            else {
                // 不存在缺省值
                if (obj[paramname].match(typetable[options.params[paramname].type])) {
                    req.cparam[paramname] = obj[paramname]
                }
                else {
                    return true
                }
            }
        }
    }

    return false
}

// 请求检查配置表入口
var entry = function(path, options) {
    reqtable[path] = options
}

module.exports = function(app) {
    // 为app附加请求检查配置表入口
    app.check = entry
    // 返回中间件回调
    return function(req, res, next) {
        if (reqtable[req.path] !== undefined) {
            if (handler(req, reqtable[req.path])) {
                throw 'error param'
            }
        }
        next()
    }
}