'use strict';

var math = require('math')
var markdown = require('markdown').markdown
var fs = require('fs')
var pool = require('./pool')
var sqlgen = require('../utils/sqlgen')
var dtformat = require('../utils/dtformat')

module.exports.listByPage = function(condition, pageno, pagesize, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.listByPage(db, 'articles', condition, pageno, pagesize, callback)
        }
    })
}

module.exports.getArticleById = function(id, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.findOne(db, 'articles', 'id=' + id, callback)
        }
    })
}

module.exports.getNearArticleByIdAndTime = function(id, time, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.findOne(db, 'articles', 'id<>' + id + ' and createtime>="' + dtformat.local(new Date(time)) + '"', function(lastone) {
                sqlgen.findOne(db, 'articles', 'id<>' + id + ' and createtime<="' + dtformat.local(new Date(time)) + '" order by createtime desc', function(nextone) {
                    callback(lastone, nextone)
                })
            })
        }
    })
}

module.exports.getArticleWithOriginalContentById = function(id, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.findOne(db, 'articles', 'id=' + id, function(result) {
                if (result) {
                    result.content = fs.readFileSync('public/articles/' + result.content, 'utf8')
                    callback(result)
                }
                else {
                    callback(null)
                }
            })
        }
    })
}

module.exports.getArticleWithContentById = function(id, callback) {
    pool.conn(function(db) {
        if (db) {
                sqlgen.findOne(db, 'articles', 'id=' + id, function(result) {
                if (result) {
                    result.content = markdown.toHTML(fs.readFileSync('public/articles/' + result.content, 'utf8'))
                    callback(result)
                }
                else {
                    callback(null)
                }
            })
        }
    })
}

module.exports.create = function(title, type, status, tags, scategory, filename, callback) {
    pool.conn(function(db) {
        if (db) {
            fs.writeFileSync(config.path + '/public/articles/' + filename, '### Hello World!', { encoding : 'utf8'})
            sqlgen.insert(db, 'articles', {
                'title' : title,
                'type' : type,
                'status' : status,
                'tags' : tags,
                // 'scategory' : scategory,
                'createtime' : 'now()',
                'content' : filename
            }, callback)
        }
    })
}

module.exports.updateContentById = function(id, content, callback) {
    pool.conn(function(db) {
        if (db) {
            sql.findOne(db, 'articles', 'id=' + id, function(article) {
                if (article) {
                    fs.writeFileSync(config.path + '/public/articles/' + article.content, content, { encoding : 'utf8' })
                    callback({ 'status' : 'ok' })
                }
                else {
                    callback(null)
                }
            })
        }
    })
}

module.exports.updateStatusById = function(id, status, callback) {
    pool.conn(function(db) {
        if (db) {
            
        }
    })
}

module.exports.remove = function(id, callback) {
    pool.conn(function(db) {
        if (db) {
            sqlgen.remove(db, 'articles', 'id=' + id, callback)
        }
    })
}