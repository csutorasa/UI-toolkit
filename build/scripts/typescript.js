const build = require('./common').build;
const task = require('./common').task;
const typescript = require('../typescript');

build(task(typescript));
