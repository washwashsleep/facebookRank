var _ = require('lodash');
var async = require('async');

var db = require('../../models');

module.exports = function (req, res, next) {

    async.waterfall([

        /*
         * 驗證欄位
         */
        function (cb){

            var err;

            ['id', 'name', 'first_name', 'last_name'].forEach(function (field){
                if(!req.body[field]){
                    err = new Error('user create `' + field + '` required');
                }
                return;
            });

            if(err){
                return cb(err);
            }

            cb();
        },

        /*
         * 產生資料庫的資料
         */
        function (cb){

            var options = _.pick(req.body, ['name', 'first_name', 'last_name']);

            // facebook user id
            options.userId = req.body.id;

            options.picture = 'http://graph.facebook.com/' + options.userId +
                '/picture?width=30&height=30';

            cb(null, options);
        },

        /*
         * 驗證這個使用者是否已經存在
         */
        function (options, cb){

            db.users.findOne({
                    userId: options.userId
                },
                function (err, aliveUser){

                    if(!aliveUser){
                        return cb(null, options);
                    }

                    req.session.user = aliveUser;
                    return res.redirect('/fans/list');
                });
        },

        /*
         * 創造新的 user
         */
        function (options, cb){

            db.users.insert(options, cb);
        },
    ],
    function (err, newUser){
        if(err){
            return next(err);
        }
        req.session.user = newUser;
        return res.redirect('/fans/list');
    });
};