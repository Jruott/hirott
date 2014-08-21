'use strict';

//启动日志模块
global.log = require('log4js').getLogger()

//加载配置文件
global.config = require('./config').getConfig()

//创建当前节点app实例
global.app = require('./app').getApp()