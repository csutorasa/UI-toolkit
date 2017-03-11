const common = require('./common');
const sass = require('../sass');

const startTime = new Date();

sass.compile().then(common.success(startTime), common.fail(startTime));
