'use strict';

module.exports.local = function(d) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' +
        d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}