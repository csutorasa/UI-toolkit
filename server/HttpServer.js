const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

class HttpServer {
	constructor() {
		this.http = http.createServer((req, res) => this.process(req, res));
	}

	listen(host, port) {
		return new Promise((resolve, reject) => {
			this.http.listen(port, host, 511, err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.http.close(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	process(req, res) {
		if(req.method === 'GET') {
			const filename = this.readFilename(req, ['/showcase', '/target', '/typings', '/node_modules']);
			if (filename) {
				this.writeFile(res, filename);
			} else {
				this.writeNotFound(res);
			}
		} else if(req.method === 'POST') {
			// TODO file upload handle
			this.writeMethodNotAllowed();
		} else {
			this.writeMethodNotAllowed();
		}
	}

	readFilename(req, paths) {
		if(!(paths instanceof Array))
			return undefined;

		for(let basepath of paths) {
			const base = path.join(process.cwd(), basepath);
			const uri = url.parse(req.url).pathname;
			const filename = path.join(base, uri);
			try {
				const stat = fs.statSync(filename);
				if (stat.isDirectory()) {
					return path.join(filename, '/index.html');
				}
				return filename;
			}
			catch (ex) {
				// file not Found
			}
		}
		return undefined;
	}

	getContentType(filename) {
		const ext = path.extname(filename);
		switch (ext) {
			case '.html': return 'text/html';
			case '.css': return 'text/css';
			case '.js': return 'text/javascript';
			case '.json': return 'application/json';
			default: return 'text/plain';
		}
	}

	writeFile(res, filename) {
		fs.readFile(filename, 'binary', (err, file) => {
			if (err) {
				this.writeInternalError(res, err);
			} else {
				res.writeHead(200, { 'Content-Type': this.getContentType(filename) });
				res.write(file, 'binary');
				res.end();
			}
		});
	}

	writeNotFound(res) {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write('404 Not Found\n');
		res.end();
	}

	writeMethodNotAllowed() {
		res.writeHead(405, { 'Content-Type': 'text/plain' });
		res.write('405 Method Not Allowed\n');
		res.end();
	}

	writeInternalError(res, err) {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.write(err + '\n');
		res.end();
	}
}

module.exports = HttpServer;
