const build = require('./common').build;
const task = require('./common').task;
const sass = require('../sass');

build(task(sass));
