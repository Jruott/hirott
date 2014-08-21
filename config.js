'use strict';

var fs = require('fs')

var hirott = JSON.parse(fs.readFileSync('./config/hirott.json', 'utf8'))

log.trace('config loaded')

module.exports.getConfig = function() {
    return { 'hirott' : hirott, 'path' : __dirname }
}