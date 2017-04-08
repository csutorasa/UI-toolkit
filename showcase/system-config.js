System.config({
	map: {
		'src': 'bundles/showcase.js'
	}
});

var debug = true;

if(debug) {
	console.debug('SystemJs is loading...');
}
var importStart = new Date();
System.import('src').then(function() {
	if(debug) {
		console.debug('SystemJs is loaded successfully in ' + (new Date().getTime() - importStart.getTime()) + 'ms');
	}
}, console.error.bind(console));
