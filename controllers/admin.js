'use strict';

var fs = require('fs'),
    uuid = require('uuid'),
    attachment = require('../models/attachment'),
    articles = require('../models/articles')

app.check('/edit', {
    params : {
        'id' : {
            'type' : 'number'
        },
        'pageno' : {
            'type' : 'number',
            'default' : 0
        },
        'pagesize' : {
            'type' : 'number',
            'default' : 10
        }
    }
})

app.all('/edit', function(req, res) {
    articles.getArticleWithOriginalContentById(req.cparam.id, function(article) {
        if (article) {
            attachment.listByPage('owner=' + req.cparam.id, req.cparam.pageno, req.cparam.pagesize, function(attfiles) {
                if (attfiles) {
                    res.render('edit', {
                        'title' : article.title + '(编辑模式) - 我的博客',
                        'user': req.session.user,
                        'article' : article,
                        'attachment' : attfiles
                    })
                }
            })
        }
    })
})

app.check('/api/article/create', {
    params : {
        'title' : {
            'type' : 'line'
        },
        'tags' : {
            'type' : 'line',
            'default' : ''
        }
    }
})

app.all('/api/article/create', function(req, res) {
    var filename = uuid.v1() + '.md'
    fs.writeFileSync(config.path + '/public/articles/' + filename, '### Hello World!', { encoding : 'utf8'})
    articles.create(req.cparam.title, 0, 0, req.cparam.tags, null, filename, function(result) {
        if (result) {
            res.send(JSON.stringify({
                'status' : 'ok',
                'result' : result
            }))
        }
    })
})

app.all('/api/article/modify', function(req, res) {
    
})

app.all('/api/article/remove', function(req, res) {
    
})

app.check('/api/file/upload', {
    params : {
        'owner' : {
            'type' : 'number',
            'default' : 0
        },
        'describe' : {
            'type' : 'string',
            'default' : ''
        }
    }
})

app.all('/api/file/upload', function(req, res) {
    var is = fs.createReadStream(req.files.f.path)
    var newname = uuid.v1()
    var os = fs.createWriteStream(config.path + '/public/upload/' + newname)
    is.pipe(os)
    is.on('end', function() {
        fs.unlink(req.files.f.path)
        attachment.add(req.files.f.originalFilename, newname, req.cparam.describe, req.session.user.id, req.cparam.owner,
            function(result) {
                if (result) {
                    res.send(JSON.stringify({
                        'status' : 'ok',
                        'result' : result
                    }))
                }
        })
    })
    is.on('error', function(err) {
        throw err
    })
})

app.check('/api/file/list', {
    params : {
        'pageno' : {
            'type' : 'number',
            'default' : 0
        },
        'pagesize' : {
            'type' : 'number',
            'default' : 10
        },
        'owner' : {
            'type' : 'number'
        }
    }
})

app.all('/api/file/list', function(req, res) {
    attachment.listByPage('owner=' + req.cparam.owner, req.cparam.pageno, req.cparam.pagesize, function(err, result) {
        if (err) {
            throw err
            return
        }

        res.send(JSON.stringify({
            'status' : 'ok',
            'list' : result
        }))
    })
})

app.check('/api/file/remove', {
    params : {
        'id' : {
            'type' : 'number'
        }
    }
})

app.all('/api/file/remove', function(req, res) {
    attachment.findOneById(req.cparam.id, function(file) {
        if (file) {
            fs.unlinkSync(config.path + '/public/upload/' + file.link)
            log.trace('remove attachment file: ' + file.link + ' (' + file.name + ')')

            attachment.remove(req.cparam.id, function(result) {
                if (result) {

                    res.send(JSON.stringify({
                        'status' : 'ok',
                        'result' : result
                    }))
                }
            })
        }
    })
})

app.check('/api/file/info', {
    params : {
        'id' : {
            'type' : 'number'
        }
    }
})

app.all('/api/file/info', function(req, res) {
    attachment.findOneById(req.cparam.id, function(result) {
        if (result) {
            res.send(JSON.stringify({
                'status' : 'ok',
                'item' : result
            }))
        }
    })
})