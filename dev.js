var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var path = "www";

browserSync.init({
		port: process.env.PORT || 3030,
		server: {
			baseDir: path,
      middleware: [historyApiFallback()]
		},
		files: path
	});
