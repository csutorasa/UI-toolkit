const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const colors = require('./colors.json').colors;
const localization = require('./localization.json');

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
		if (req.method === 'GET') {
			const filename = this.readFilename(req, ['/showcase', '/target', '/node_modules', '/upload']);
			if (filename) {
				this.writeFile(res, filename);
			} else {
				this.writeNotFound(res);
			}
		} else if (req.method === 'POST') {
			switch (req.url) {
				case '/localization':
					this.readBody(req, data => {
						const json = JSON.parse(data);
						const localizationData = this.getTranslation(json.language);
						this.writeObject(res, localizationData);
					})
					break;
				case '/languages':
					this.readBody(req, data => {
						this.writeObject(res, ['en', 'hu']);
					})
					break;
				case '/search':
					this.readBody(req, data => {
						const search = data.toLowerCase();
						const starts = [];
						const matches = [];
						colors.forEach(c => {
							const index = c.toLowerCase().indexOf(search);
							if (index === 0) {
								starts.push(c);
							} else if (index > 0) {
								matches.push(c);
							}
						});
						const result = starts.concat(matches).slice(0, 100);
						this.writeObject(res, result);
					})
					break;
				case '/upload':
					this.readBody(req, data => {
						const json = JSON.parse(data);
						try {
							fs.statSync('upload');
							// exists
						} catch (ex) {
							// not exists
							fs.mkdirSync('upload');
						}
						fs.writeFile('upload/' + json.filename, json.content, 'binary', err => {
							if (err) {
								this.writeInternalError(res, err);
							} else {
								this.writeObject(res, {});
							}
						});
					});
					break;
				default:
					this.writeNotFound(res);
					break;
			}
		} else {
			this.writeMethodNotAllowed();
		}
	}

	getTranslation(language) {
		switch (language) {
			case 'hu':
				return localization.hu;
			case 'en':
				return localization.en;
			default: return {};
		}
	}

	readBody(req, callback) {
		var body = '';

		req.on('data', function (data) {
			body += data;

			if (body.length > 100001000)
				request.connection.destroy();
		});

		req.on('end', function () {
			callback(body);
		});
	}

	readFilename(req, paths) {
		if (!(paths instanceof Array))
			return undefined;

		for (let basepath of paths) {
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

	writeObject(res, object) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(object));
		res.end();
	}

	writeFile(res, filename) {
		fs.readFile(filename, 'binary', (err, file) => {
			if (err) {
				this.writeInternalError(res, err);
			} else {
				res.writeHead(200, { 'Content-Type': this.getContentType(filename) + '; charset=utf-8' });
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
