'use strict';

var mysql = require('mysql')

var pool = mysql.createPool(config.hirott.db)

// module.exports.getConnection = function(callback) {
//     pool.getConnection(function(err, db) {
//         if (err) {
//             callback(err)
//             return
//         }

//         callback(err, db)
//     })
// }

module.exports = pool

module.exports.conn = function(callback) {
    pool.getConnection(function(err, db) {
        if (err) {
            log.error(err)
            callback(null)
        }
        else {
            callback(db)
        }
    })
}