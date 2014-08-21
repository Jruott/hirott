'use strict';

var math = require('math')
var tag = '(sqlgen.js) generate sql: '

module.exports.insert = function(db, table, values, callback) {
    var sql = 'insert into ' + table + ' '
    var col = '', val = ''
    var flag = true
    for(var key in values) {
        if (flag) {
            flag = false
        }
        else {
            col += ','
            val += ','
        }
        col += key
        if (values[key] === 'now()') {
            val += 'now()'
        }
        else {
            val += '"'
            val += values[key]
            val += '"'
        }
    }

    sql += '('
    sql += col
    sql += ') values ('
    sql += val
    sql += ')'

    log.trace(tag + sql)

    db.query(sql, function(err, result) {
        if (err) {
            log.error(err)
            callback(null)
        }
        else {
            callback(result)
        }
    })
}

module.exports.update = function(db, table, values, condition, callback) {
    var sql = 'update ' + table + ' set '
    var flag = true
    for(var key in values) {
        if (flag) {
            flag = false
        }
        else {
            sql += ','
        }
        if (values[key] === 'now()') {
            sql += key + '=' + 'now()'
        }
        else {
            sql += key + '=' + '"' + values[key] + '"'
        }
    }
    log.trace(tag + sql)
    db.query(sql, function(err, result) {
        if (err) {
            log.error(err)
            callback(null)
        }
        else {
            callback(result)
        }
    })
}

module.exports.findOne = function(db, table, condition, callback) {
    var sql = 'select * from ' + table + ' where ' + condition
    log.trace(tag + sql)
    db.query(sql, function(err, result) {
        if (err) {
            log.error(err)
            callback(null)
        }
        else {
            if (result.length > 0) {
                callback(result[0])
            }
            else {
                callback(null)
            }
        }
    })
}

module.exports.count = function(db, table, condition, callback) {
    var sql = 'select count(id) from ' + table
    if (condition) {
        sql += ' where ' + condition 
    }
    log.trace(tag + sql)
    db.query(sql, function(err, result) {
        if (err) {
            log.error(err)
            callback(null)
        }
        else {
            callback(result[0]["count(id)"])
        }
    })
}

module.exports.listByPage = function(db, table, condition, pageno, pagesize, callback) {
    module.exports.listColumnByPage(db, '*', table, condition, pageno, pagesize, callback)
}

module.exports.listColumnByPage = function(db, column, table, condition, pageno, pagesize, callback) {
    module.exports.count(db, table, condition, function(total) {
        if (total >= 0) {
            var sql = 'select ' + column + ' from ' + table
            if (condition) {
                sql += ' where ' + condition 
            }
            sql += ' limit ' + (pageno * pagesize) + ',' + pagesize
            log.trace(tag + sql)
            db.query(sql, function(err, rows) {
                if (err) {
                    log.error(err)
                    callback(null)
                }
                else {
                    callback({ 'items' : rows, 'total' : math.ceil(total / pagesize), 'current' : pageno })
                }
            })
        }
    })
}

module.exports.remove = function(db, table, condition, callback) {
    var sql = 'delete from ' + table + ' where ' + condition
    log.trace(tag+ sql)
    db.query(sql, function(err, result) {
        if (err) {
            log.error(err)
            callback(null)
        }
        else {
            callback(result)
        }
    })
}