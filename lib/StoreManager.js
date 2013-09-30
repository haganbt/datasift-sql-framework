'use strict';
  var StoreManager
  , strftime 	= require('strftime')
  , orm 			= require("orm")
  , utils 		= require('./utils')
  , opts 			= utils.loadConfig('database')
  , model 		= utils.loadConfig('model').definition_name
  , processor = utils.loadProcessor(model)
  ;

console.log('INFO: Starting with "' + model + '" model.' );

// check we have a processor
if(processor === false){
	console.log("ERROR: Failed to load processor file /lib/processors/" + model);
	process.exit(1);	
} else {
	processor = require(processor);
}

// database connection
var db = orm.connect(opts, function (err, db) {
	  if (err) {
	    console.log("Failed to connect to DB: ", err);
	    process.exit(1);
	  }
});

// Initiate the processor class
processor = new processor(db);

StoreManager = function StoreManager() {

	StoreManager.fn.reset();

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
				
				/*
				processor.proces(db.models, item, item.interaction.id, ts, function (err) {
				  if (err) console.log('ERROR: ' + err);
				  return;
				});
				*/
				
    	}
		}
	} catch (e){
		console.log('DEBUG: ' + e);
	}
  
};


StoreManager.fn.reset = function () {

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

module.exports = StoreManager;