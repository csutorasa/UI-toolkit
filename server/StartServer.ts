import { HttpServer } from './HttpServer';

const host: string = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
const port: number = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.argv[2]) || 8080;

const server = new HttpServer();
server.listen(host, port).then(() => {
	console.log('Server is running at http://' + host + ':' + port);
	console.log('CTRL + C to shutdown');
}, err => {
	console.error('Failed to start the server: ' + err);
});
