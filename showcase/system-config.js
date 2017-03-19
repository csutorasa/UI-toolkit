System.config({
	transpiler: 'typescript',
	typescriptOptions: {
		target: "es5",
		emitDecoratorMetadata: true,
        experimentalDecorators: true,
		paths: {
            "uitoolkit/*": ["./uitoolkit/*"]
		}
	},
	map: {
		'src': './src',

		'@angular/common': '@angular/common/bundles/common.umd.min.js',
		'@angular/compiler': '@angular/compiler/bundles/compiler.umd.min.js',
		'@angular/core': '@angular/core/bundles/core.umd.min.js',
		'@angular/forms': '@angular/forms/bundles/forms.umd.min.js',
		'@angular/http': '@angular/http/bundles/http.umd.min.js',
		'@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.min.js',
		'@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
		'@angular/router': '@angular/router/bundles/router.umd.min.js',

		'rxjs': 'rxjs',
		'typescript': 'typescript/lib/typescript.js'
	},
	packages: {
		src: {
			main: './main.ts',
			defaultExtension: 'ts'
		},
		uitoolkit: {
			defaultExtension: 'js'
		},
		rxjs: {
			defaultExtension: 'js'
		}
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
