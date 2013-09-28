'use strict';
  var StoreManager
  , strftime 	= require('strftime')
  , orm = require("orm")
  , utils = require('./utils')
  , opts = utils.loadConfig()
  ;

// Connect to the BD
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
	this.Twitter_place		= db.models.twitter_place;
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
				if(item.interaction){
					
					// Extract GEO
					if(item.interaction.geo && item.interaction.geo.latitude && item.interaction.geo.longitude){
							item.interaction.longitude = item.interaction.geo.longitude;
							item.interaction.latitude = item.interaction.geo.latitude;
					}	
					
					this.Interaction.create([item.interaction], function (err, items) {
						 	if (err) console.log("ERROR: Insert failed for INTERACTION: ", err);
						 	//console.log(JSON.stringify(items));		 	
					});
				}

 				// TWITTER_USER
				if(item.twitter && !item.twitter.retweet && item.twitter.user){

				  item.twitter.user.twitter_id = item.twitter.id;
				 	item.twitter.user.id = id;

  				this.Twitter_user.create([item.twitter.user], function (err, items) {
  					 	if (err) console.log("ERROR: Insert failed for TWITTER_USER: ", err);
  				});
  			}

				// TWITTER_PLACE
				if(item.twitter && !item.twitter.retweet && item.twitter.place){

				  item.twitter.place.twitter_place_id = item.twitter.place.id;
				  item.twitter.place.id = id;

  				this.Twitter_place.create([item.twitter.place], function (err, items) {
  					 	if (err) console.log("ERROR: Insert failed for TWITTER_PLACE: ", err);		
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

				/*
				 * LINKS
				 * 
				 * Links can contain multiple values, for example:
				 * 	"url": [
         *   	"http://will.i.am",
         *   	"http://adk-radio.net"
         *	]
         * 
         * In this implementation, all are saved and
         * hence duplicate interaction.id's are expected
         * 
				 */
				if(item.links && item.links.url && typeof(item.links.url) === 'object'){
					for (var z in item.links.url) {
						
						var eachLink 		= {};
						eachLink.id 		= id;
						eachLink.title	= item.links.title[z];
						eachLink.url 		= item.links.url[z];
						
						this.Links.create(eachLink, function (err, items) {
							if (err) console.log("ERROR: Insert failed for LINKS: ", JSON.stringify(err));
						});
						
					}
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
		  db.models.twitter_place.sync(function (err) {
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