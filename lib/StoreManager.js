  'use strict';;
  var StoreManager
  , strftime 	= require('strftime')
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


var db = orm.connect(opts, function (err, db) {
	  if (err) {
	    console.log("Failed to connect to DB: ", err);
	    return;
	  }
});

// Load models
db.load("./models/models", function (err) {  
  if (err) {
    console.log("Failed to load models: ", err);
  }
	// Make any schema changes
	var Interaction = db.models.interaction;
	var Tags    		= db.models.tags;
	
	// Drop and recreate schema
	db.drop(function () {
	  db.models.interaction.sync(function (err) {
	    if(err) console.log(err);
	  });
	  db.models.tags.sync(function () {
	    if(err) console.log(err);
	  });
	  db.models.links.sync(function () {
	    if(err) console.log(err);
	  });	  
	});
});


StoreManager = function StoreManager() {
	this.Interaction 	= db.models.interaction;
	this.Tags    			= db.models.tags;
	this.Links    		= db.models.links;	 
};

StoreManager.fn = StoreManager.prototype;

// Process the inbound data
StoreManager.fn.process = function (inbound) {

//	try {
		var body = inbound.rawBody.split(/\r?\n/);
		for (var i in body) {
    	if (body.hasOwnProperty(i)) {
    		var item = JSON.parse(body[i]);
				
				// Set the UUID (interaction.id)
				var id = item.interaction.id; 
				
				// INTERACTION
				this.Interaction.create([item.interaction], function (err, items) {
					 	if (err) console.log("Insert failed: ", err);
					 // console.log(JSON.stringify(items));					 	
				});	

				// LINKS
				if(item.links){
					item.links.id = id; // Inject the interaction id
					this.Links.create(item.links, function (err, items) {
						if (err) console.log("Insert failed: ", err);
					  //console.log(JSON.stringify(items));
					});
				}
					
				insertList(this.Tags, "tag", item.interaction.tags);
				
								
    	}
		}
//  } catch (e){
//  	console.log('DEBUG: ' + e);
 // }
  
};

StoreManager.fn.get = function () {
  return true;
};


function insertList(table, field, data){
	//console.log(JSON.stringify(data));
	if(typeof(data) === 'object')
		for (var i in data) {
			
			var each = { field : data[i]};

			//table.create([each], function (err, items) {
			//if (err) console.log("Insert failed: ", err);
			//console.log(JSON.stringify(items));					 	
			//});
	}	
		
		/*
		table.create([data], function (err, items) {
			 if (err) console.log("Insert failed: ", err);
			 console.log(JSON.stringify(items));					 	
		});
		*/
}

module.exports = StoreManager;