const build = require('./common').build;
const task = require('./common').task;
const typings = require('../typings');

build(task(typings));
