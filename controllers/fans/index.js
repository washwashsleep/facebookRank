var express = require('express');
var router = express.Router();

var pageList = require('./pageList');
var pageCreate = require('./pageCreate');
var pageShow = require('./pageShow');
var activeCreate = require('./activeCreate');
var activeRemove = require('./activeRemove');

router.route('/list')
    .get(pageList);

router.route('/create')
    .get(pageCreate);

router.route('/activeCreate')
    .post(activeCreate);

router.route('/show/:id')
    .get(pageShow);

router.route('/show/:id')
    .delete(activeRemove);

module.exports = router;