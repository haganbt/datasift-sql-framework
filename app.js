'use strict';
var express = require('express')
  , http = require('http')
  , path = require('path')
  ;

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.limit('20mb'));
	
  // NOTE: we cannot use bodyParser as DS
  // sends a application/json header for line
  // delimited data - strictly invalid
	app.use (function(req, res, next) {
	    var data='';
	    req.setEncoding('utf8');
	    req.on('data', function(chunk) { 
	       data += chunk;
	    });	
	    req.on('end', function() {
	        req.rawBody = data;
	        next();
	    });
	});
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.configure('development', function () {
});


var storeRoutes = require('./lib/routes/store')({
  storeManager: exports.storeManager
});

// Routes
app.get('/', storeRoutes.show);
app.post('/data', storeRoutes.save);


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
