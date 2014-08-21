'use strict';

var articles = require('../models/articles')
var admins = require('../models/admins')

app.check('/', {
    params : {
        'pageno' : {
            'type' : 'number',
            'default' : 0
        },
        'pagesize' : {
            'type' : 'number',
            'default' : 3
        }
    }
})

app.all('/', function(req, res) {
    articles.listByPage('status=1 order by createtime desc', req.cparam.pageno, req.cparam.pagesize, function(result) {
        if (result) {
            res.render('index', {
                'title' : '首页 - 我的博客',
                'user': req.session.user,
                'list' : result
            })
        }
    })
})

app.check('/article', {
    params : {
        'id' : {
            'type' : 'number'
        }
    }
})

app.all('/article', function(req, res) {
    articles.getArticleWithContentById(req.cparam.id, function(result) {
        if (result) {
            articles.getNearArticleByIdAndTime(req.cparam.id, result.createtime, function(lastone, nextone) {
                res.render('article', {
                    'title' : result.title + ' - 我的博客',
                    'user': req.session.user,
                    'article' : result,
                    'lastone' : lastone,
                    'nextone' : nextone
                })
            })
        }
    })
})

app.all('/adminlogin', function(req, res) {
    res.render('adminlogin', {
        'title' : '登录后台'
    })
})

app.check('/login', {
    params : {
        'un' : {
            'type' : 'id'
        },
        'pwd' : {
            'type' : 'password'
        }
    }
})

app.all('/login', function(req, res) {
    admins.verify(req.cparam.un, req.cparam.pwd, function(user) {
        if (user) {
            req.session.user = user
            res.redirect('/')
        }
        else {
            throw 'invaild user'
        }
    })
})

app.all('/logout', function(req, res) {
    if (req.session.user) {
        req.session.user = undefined
        delete req.session.user
        res.redirect('/')
    }
    else {
        throw 'not login yet'
    }
})