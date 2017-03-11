const common = require('./common');
const typings = require('../typings');

const startTime = new Date();

typings.compile().then(common.success(startTime), common.fail(startTime));
