const common = require('./common');
const typescript = require('../typescript');
const sass = require('../sass');

const startTime = new Date();

Promise.all([
    typescript.compile(),
    sass.compile()
]).then(common.success(startTime), common.fail(startTime));
