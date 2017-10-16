import * as http from 'http';
import * as url from 'url';
import * as path from 'path';
import * as fs from 'fs';
const colors = require('./colors.json').colors;
const localization = require('./localization.json');

export class HttpServer {
	protected http: http.Server;
	protected defaultProcessor: RequestProcessor = new DefaultProcessor();
	protected getProcessor: RequestProcessor = new GetProcessor();
	protected postProcessor: RequestProcessor = new PostProcessor();
	constructor() {
		this.http = http.createServer((req, res) => this.process(req, res));
	}

	public listen(host: string, port: number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.http.listen(port, host, 511, err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	public close(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.http.close(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	protected process(req: http.ServerRequest, res: http.ServerResponse) {
		if (req.method === 'GET') {
			this.getProcessor.process(req, res);
		} else if (req.method === 'POST') {
			this.postProcessor.process(req, res);
		} else {
			this.defaultProcessor.process(req, res);
		}
	}
}

abstract class RequestProcessor {
	public abstract process(req: http.ServerRequest, res: http.ServerResponse): void;

	protected readBody(req: http.ServerRequest, callback: (data: string) => void) {
		var body = '';

		req.on('data', function (data) {
			body += data;

			if (body.length > 100001000)
				req.connection.destroy();
		});

		req.on('end', function () {
			callback(body);
		});
	}

	protected getContentType(filename: string): string {
		const ext = path.extname(filename);
		switch (ext) {
			case '.html': return 'text/html';
			case '.css': return 'text/css';
			case '.js': return 'text/javascript';
			case '.json': return 'application/json';
			default: return 'text/plain';
		}
	}

	protected writeFile(res: http.ServerResponse, filename: string): void {
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

	protected writeNotFound(res: http.ServerResponse): void {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write('404 Not Found\n');
		res.end();
	}

	protected writeMethodNotAllowed(res: http.ServerResponse): void {
		res.writeHead(405, { 'Content-Type': 'text/plain' });
		res.write('405 Method Not Allowed\n');
		res.end();
	}

	protected writeInternalError(res: http.ServerResponse, err: any): void {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.write(err + '\n');
		res.end();
	}
	protected writeObject(res: http.ServerResponse, object: any): void {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(object));
		res.end();
	}
}

class DefaultProcessor extends RequestProcessor {
	public process(req: http.ServerRequest, res: http.ServerResponse): void {
		this.writeMethodNotAllowed(res);
	}
}

class GetProcessor extends RequestProcessor {
	public process(req: http.ServerRequest, res: http.ServerResponse): void {
		const filename = this.readFilename(req, ['/showcase/bundles', '/showcase/public', '/wizyx/bundles', '/node_modules', '/node_modules/wizyx/bundles', '/upload']);
		if (filename) {
			this.writeFile(res, filename);
		} else {
			this.writeNotFound(res);
		}
	}

	protected readFilename(req, paths) {
		if (!(paths instanceof Array))
			return undefined;
		for (let basepath of paths) {
			const base = path.join(process.cwd(), basepath);
			const uri = url.parse(req.url).pathname;
			let filename = path.join(base, uri);
			try {
				const stat = fs.statSync(filename);
				if (stat.isDirectory()) {
					filename = path.join(filename, '/index.html');
					fs.statSync(filename);
				}
				return filename;
			}
			catch (ex) {
				// file not Found
			}
		}
		return undefined;
	}
}

class PostProcessor extends RequestProcessor {
	public process(req: http.ServerRequest, res: http.ServerResponse): void {
		switch (req.url) {
			case '/localization':
				this.readBody(req, data => {
					this.localization(req, res, data);
				});
				break;
			case '/languages':
				this.languages(req, res);
				break;
			case '/search':
				this.readBody(req, data => {
					this.search(req, res, data);
				})
				break;
			case '/upload':
				this.readBody(req, data => {
					this.upload(req, res, data);
				});
				break;
			default:
				this.writeNotFound(res);
				break;
		}
	}

	protected localization(req: http.ServerRequest, res: http.ServerResponse, data: string): void {
		const json = JSON.parse(data);
		let localizationData;
		switch (json.language) {
			case 'hu':
				localizationData = localization.hu;
				break;
			case 'en':
				localizationData = localization.en;
				break;
			default: localizationData = {};
		}
		this.writeObject(res, localizationData);
	}

	protected languages(req: http.ServerRequest, res: http.ServerResponse): void {
		this.writeObject(res, ['en', 'hu']);
	}

	protected search(req: http.ServerRequest, res: http.ServerResponse, data: string): void {
		const json = JSON.parse(data.toLowerCase());
		const starts = [];
		const matches = [];
		colors.forEach(c => {
			const index = c.toLowerCase().indexOf(json.search);
			if (index === 0) {
				starts.push(c);
			} else if (index > 0) {
				matches.push(c);
			}
		});
		const from = json.from || 0;
		const to = json.to || 100;
		const result = starts.concat(matches).slice(from, to);
		this.writeObject(res, result);
	}

	protected upload(req: http.ServerRequest, res: http.ServerResponse, data: string): void {
		const json = JSON.parse(data);
		try {
			fs.statSync('upload');
			// exists
		} catch (ex) {
			// not exists
			fs.mkdirSync('upload');
		}
		fs.writeFile('upload/' + json.filename, json.content, {encoding: 'binary'}, err => {
			if (err) {
				this.writeInternalError(res, err);
			} else {
				this.writeObject(res, {});
			}
		});
	}
}
