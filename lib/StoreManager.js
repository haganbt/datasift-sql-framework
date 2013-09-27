'use strict';
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

// TODO - extract to reset function and call on init
var db = orm.connect(opts, function (err, db) {
	  if (err) {
	    console.log("Failed to connect to DB: ", err);
	    return;
	  }
});



StoreManager = function StoreManager() {
	
	StoreManager.fn.reset();
	
	this.Interaction 			= db.models.interaction;
	this.Interaction_tags = db.models.interaction_tags;
	this.Twitter    			= db.models.twitter;
	this.Twitter_user			= db.models.twitter_user;
	this.Links    				= db.models.links;		 
};

StoreManager.fn = StoreManager.prototype;

// Process the inbound data
StoreManager.fn.process = function (inbound) {

	try {
		var body = inbound.rawBody.split(/\r?\n/);
		for (var i in body) {
    	if (body.hasOwnProperty(i)) {
    		var item = JSON.parse(body[i]);
				
				// Set the UUID (interaction.id)
				var id = item.interaction.id; 
				
				// INTERACTION
				this.Interaction.create([item.interaction], function (err, items) {
					 	if (err) console.log("ERROR: Insert failed for INTERACTION: ", err);
					 	//console.log(JSON.stringify(items));		 	
				});	

 				// TWITTER_USER
				if(item.twitter && !item.twitter.retweet && item.twitter.user){

				  item.twitter.user.twitter_id = item.twitter.id;
				 	item.twitter.user.id = id;

  				this.Twitter_user.create([item.twitter.user], function (err, items) {
  					 	if (err) console.log("ERROR: Insert failed for TWITTER_USER: ", err);
  				});
  			}

				// TWITTER
				if(item.twitter && !item.twitter.retweet){

				  item.twitter.twitter_id = item.twitter.id;
				  item.twitter.id = id;

  				this.Twitter.create([item.twitter], function (err, items) {
  					 	if (err) console.log("ERROR: Insert failed for TWITTER: ", err);	
  				});
  			}

				// LINKS
				if(item.links){
					item.links.id = id; // Inject the interaction id
					this.Links.create(item.links, function (err, items) {
						if (err) console.log("ERROR: Insert failed for LINKS: ", err);
					});
				}
			
				// TAGS	- lists items
				if(item.interaction.tags){
					_insertList(this.Interaction_tags, "tag", item.interaction.tags, item.interaction.id);
				}	
				
								
    	}
		}
	} catch (e){
		console.log('DEBUG: ' + e);
	}
  
};

StoreManager.fn.get = function () {
  return true;
};


/*
 * reset - drop and recreate the schema
 *
 */
StoreManager.fn.reset = function () {
	
	// Load models
	db.load("./models/models", function (err) {  
	  if (err) {
	    console.log("Failed to load models: ", err);
	  }
		
		// Drop and recreate schema
		db.drop(function () {
		  db.models.interaction.sync(function (err) {
		    if(err) return err;
		  });
		  db.models.interaction_tags.sync(function (err) {
		    if(err) return err;
		  });
		  db.models.links.sync(function (err) {
		    if(err) return err;
		  });
		  db.models.twitter.sync(function (err) {
		    if(err) return err;
		  });
		 	db.models.twitter_user.sync(function (err) {
		    if(err) return err;
		  }); 
		});
		
		if(err) return err;
		
	});
};


/*
 * insertList - process a list item and insert to DB
 * @param - object
 * @param - string 	- field name that we wish to insert to
 * @param - object 	- the list object
 * @param - id 			- an id to associate with the list item
 * 
 */
function _insertList (table, field, list, id) {

	if(typeof(list) === 'object')
		for (var i in list) {
			
			// Build an object to insert
			var listItem 		= { id : id };
			listItem[field]	= list[i];
			
			table.create([listItem], function (err, items) {
				if (err) console.log("Insert failed: ", err);
			  //console.log(JSON.stringify(items));					 	
			});
	}
	
};



module.exports = StoreManager;