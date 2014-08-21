'use strict';

var articles = require('../models/articles')

app.check('/articleapi', {
    params : {
        'id' : {
            'type' : 'number'
        }
    }
})

app.all('/articleapi', function(req, res) {
    articles.getArticleWithContentById(req.cparam.id, function(result) {
        if (result) {
            articles.getNearArticleByIdAndTime(req.cparam.id, result.createtime, function(lastone, nextone) {
                res.render('articletmp', {
                    'article' : result,
                    'lastone' : lastone,
                    'nextone' : nextone
                })
            })
        }
    })
})