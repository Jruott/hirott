'use strict';

var pool = require('./pool')
var sqlgen = require('../utils/sqlgen')

module.exports.add = function(name, link, describe, uploader, owner, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.insert(db, 'attachment', {
                'name' : name,
                'link' : link,
                'description' : describe,
                'uploader' : uploader,
                'owner' : owner,
                'uploadtime' : 'now()'
            }, callback)
        }
    })
}

module.exports.remove = function(id, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.remove(db, 'attachment', 'id=' + id, callback)
        }
    })
}

module.exports.listByPage = function(condition, pageno, pagesize, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.listByPage(db, 'attachment', condition, pageno, pagesize, callback)
        }
    })
}

module.exports.count = function(condition, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.count(db, 'attachment', condition, callback)
        }
    })
}

module.exports.findOneById = function(id, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.findOne(db, 'attachment', 'id=' + id, callback)
        }
    })
}