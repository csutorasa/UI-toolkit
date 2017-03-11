const common = require('./common');
const typescript = require('../typescript');

const startTime = new Date();

typescript.compile().then(common.success(startTime), common.fail(startTime));
