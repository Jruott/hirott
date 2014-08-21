'use strict';

var pool = require('./pool')
var sqlgen = require('../utils/sqlgen')

module.exports.verify = function(username, password, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.findOne(db, 'admin', 'name="' + username + '" and password="' + password + '"', function(result) {
                if (result) {
                    db.query("update admin set logintime=now() where id=" + result.id, function(err) {
                        callback(result)
                    })
                }
                else {
                    callback('not found user')
                }
            })
        }
    })
}

module.exports.verifyWithoutUpdate = function(condition, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.findOne(db, 'admin', condition, callback)
        }
    })
}

module.exports.add = function(callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.insert(db, 'admin', {
                'name' : name,
                'password' : password,
                'nickname' : nickname,
                'email' : email
            }, callback)
        }
    })
}

module.exports.remove = function(id, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.remove(db, 'admin', 'id=' + id, callback)
        }
    })
}