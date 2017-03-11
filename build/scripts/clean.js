const build = require('./common').build;
const task = require('./common').task;
const clean = require('../clean');

build(task(clean));
