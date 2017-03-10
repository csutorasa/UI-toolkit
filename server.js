const HttpServer = require('./server/HttpServer');

const host = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
const port = process.env.OPENSHIFT_NODEJS_PORT || parseInt(process.argv[2]) || 8080;

const server = new HttpServer();
server.listen(host, port).then(() => {
	console.log('Server is running at http://' + host + ':' + port);
	console.log('CTRL + C to shutdown');
}, err => {
	console.error('Failed to start the server: ' + err);
});
