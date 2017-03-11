System.config({
	transpiler: 'typescript',
	typescriptOptions: {
		target: "es5",
		module: "commonjs",
		emitDecoratorMetadata: true,
        experimentalDecorators: true
	},
	map: {
		'app': '/app',

		'@angular/common': '@angular/common/bundles/common.umd.min.js',
		'@angular/compiler': '@angular/compiler/bundles/compiler.umd.min.js',
		'@angular/core': '@angular/core/bundles/core.umd.min.js',
		'@angular/forms': '@angular/forms/bundles/forms.umd.min.js',
		'@angular/http': '@angular/http/bundles/http.umd.min.js',
		'@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.min.js',
		'@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
		'@angular/router': '@angular/router/bundles/router.umd.min.js',

		'rxjs': 'rxjs/bundles/Rx.min.js',
		'typescript': 'typescript/lib/typescript.js'
	},
	packages: {
		app: {
			main: './main.ts',
			defaultExtension: 'ts'
		},
		rxjs: {
			defaultExtension: 'js'
		}
	}
});

System.import('app').catch(console.error.bind(console));
