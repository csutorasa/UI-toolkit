
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
    };
}

module.exports = {
    success,
    fail
}
