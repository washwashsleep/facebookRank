/*
 * node modules
 */
var async = require('async');
var CronJob = require('cron').CronJob;

/*
 * loaded models
 */
var models = require('../models');
var cronUpdate = require('./cronUpdate');
// var controllers = require('../controllers');

/*
 * setting cron jobs
 */
var updateFans = new CronJob({
	cronTime: '*/30 * * * * *',
	onTick: function() {
		cronUpdate(function (err){
			if(err){
				console.log(err);
			}
			console.log('done');
		});
	},
	start: true,
	timeZone: 'Asia/Taipei'
});

/*
 * start function
 */
var start = function() {
	updateFans.start();
};

/*
 * start
 */
start();