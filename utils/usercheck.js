'use strict';

var admins = require('../models/admins')

module.exports = function(app) {
    return function(req, res, next) {
        if (req.session.user) {
            admins.verify(req.session.user.name, req.session.user.password, function(err, result) {
                if (err) {
                    throw err
                    return
                }
                
                next()
            })
        }
        else {
            next()
        }
    }
}
