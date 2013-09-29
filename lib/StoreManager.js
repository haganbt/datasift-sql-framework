'use strict';
  var StoreManager
  , strftime 	= require('strftime')
  , orm 			= require("orm")
  , utils 		= require('./utils')
  , opts 			= utils.loadConfig('database')
  , model 		= utils.loadConfig('model').definition_name
  , processor = require(utils.loadProcessor(model))
  ;

console.log('INFO: Starting with "' + model + '" model.' );


// database connection
var db = orm.connect(opts, function (err, db) {
	  if (err) {
	    console.log("Failed to connect to DB: ", err);
	    process.exit(1);
	  }
});

// call the processor class
var processor = new processor(db);

StoreManager = function StoreManager() {

	// load models
	db.load("./models/" + model, function (err) { 
		if (!err){
	  	db.drop(function () {
        // dropped all tables from defined models
				for (var eachModel in db.models) {
					db.models[eachModel].sync(function (err) {
				  	if(err) return err;
					});
				}
    	});
				
		} else {
			if(err.code === 'MODULE_NOT_FOUND'){
				console.log('ERROR: Failed to load model file: /lib/models/' + model + '.js');
			} else {
				console.log(err);	
			}	
			process.exit(1);
		}
	});
	 
};

StoreManager.fn = StoreManager.prototype;

// parse the inbound data and offload to processor
StoreManager.fn.process = function (inbound) {

	try {
		var body = inbound.rawBody.split(/\r?\n/);
		for (var i in body) {
    	if (body.hasOwnProperty(i)) {
    		var item = JSON.parse(body[i]);
				var ts = utils.dateFormat(item.interaction.created_at);
				processor.process(db.models, item, item.interaction.id, ts);
    	}
		}
	} catch (e){
		console.log('DEBUG: ' + e);
	}
  
};

// TODO
StoreManager.fn.get = function () {

};

// TODO
StoreManager.fn.reset = function () {

};

module.exports = StoreManager;