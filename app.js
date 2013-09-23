// TODO - configure orm as middleware.

'use strict';
var express = require('express')
  , http = require('http')
  , path = require('path')
  , orm = require("orm")
  ;

// TODO: extract to config file
var opts = {
  database : "datasift",
  protocol : "mysql",
  host     : "127.0.0.1",
  port     : 3306,         // optional, defaults to database default
  user     : "root",
  password : "",
  query    : {
    pool     : false,    // optional, false by default
    debug    : false    // optional, false by default
  }
};


// Database
orm.connect(opts, function (err, db) {
  if (err) {
    console.log("Failed to connect to DB: ", err);
    return;
  }

  // Load models
  db.load("./lib/models/models", function (err) {  
    if (err) {
        console.log("Cannot load models", err);
    }
    // loaded!
    var Person = db.models.person;
    var Pet    = db.models.pet;
    
    // Drop and recreate schema
    db.drop(function () {
        // dropped all tables from defined models (Person and Pet)
      Person.sync(function () {
        // created tables for Person model
      });
    });
  });
});


var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.limit('20mb'));
  // Note we cannot use bodyParser as DS
  // seds a application/json header for line
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
