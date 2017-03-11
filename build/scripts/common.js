function build(promise) {
    const startTime = new Date();
    return promise.then(success(startTime), fail(startTime));
}

function success(start) {
    return () => {
        console.log('Build time: ' + (new Date().getTime() - start.getTime()) + ' ms');
        console.log('Build succeed!');
    };
}

function fail(start) {
    return (err) => {
        console.error(err);
        console.log('Build time: ' + (new Date().getTime() - start.getTime()) + ' ms');
        console.log('Build failed!');
        process.exit(1);
    };
}

module.exports = {
    build
}
