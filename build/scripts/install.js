const build = require('./common').build;
const task = require('./common').task;
const clean = require('../clean');
const typescript = require('../typescript');
const sass = require('../sass');

build(task(clean).then(() => Promise.all([
    task(typescript),
    task(sass)
])));
