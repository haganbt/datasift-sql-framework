// TODO: add subscription id to interaction

/* TYPES: The supported types are:
 * - text: A text string;
 * - number: A number value;
 * - boolean: A true/false value;
 * - date: A date object;
 * - enum: A value from a list of possible values;
 * - object: A JSON object;
 * - point: A N-dimensional point (not generally supported);
 * - binary: Binary data.
 */

module.exports = function (db, cb) {
  
  // INTERACTION
  db.define('interaction', {
    id          : { type: "text", size: 64 },
    content     : { type: "text", size: 1024 },
    contenttype : { type: "text", size: 20 },      
  	created_at  : Date,
    link		 		: { type: "text", size: 250 },    	
    source	 		: { type: "text", size: 20 },     	
    title       : { type: "text", size: 250 },    	
    type        : { type: "text", size: 50 },
    latitude  	: Number,
    longitude  	: Number,
  	type        : { type: "text", size: 20 },
    tags        : Object
  });

  // TWITTER
  db.define('twitter', {
    id                    	: { type: "text", size: 64 },
    twitter_id            	: { type: "text", size: 128 },
    created_at  						: Date,
  	latitude  							: Number,
    longitude  							: Number,
    in_reply_to_screen_name	: { type: "text", size: 20 },
    in_reply_to_status_id   : { type: "text", size: 100 },
    in_reply_to_user_id     : { type: "text", size: 30 },
    source        					: { type: "text", size: 100 },
    status        					: { type: "text", size: 200 },
    text                  	: { type: "text", size: 256 }
  });
  
  // TWITTER_USER
  db.define('twitter_user', {
    id                    	: { type: "text", size: 64 },
    twitter_id            	: { type: "text", size: 128 },
    created_at  						: Date,
    description        			: { type: "text", size: 200 },
  	followers_count  				: Number,
    friends_count  					: Number,
    listed_count  					: Number,    
   	statuses_count  				: Number,      
	  geo_enabled  						: { type: "boolean", defaultValue: 0 },
    lang        						: { type: "text", size: 20 },
    location        				: { type: "text", size: 100 },
    name            				: { type: "text", size: 128 },
    screen_name            	: { type: "text", size: 20 },
    time_zone            		: { type: "text", size: 20 },
  	url            					: { type: "text", size: 250 },
   	utc_offset  						: Number,
	  verified  							: { type: "boolean", defaultValue: 0 },   	        
  });
  
  // INTERACTION_TAGS
  db.define('interaction_tags', {
    id      : { type: "text", size: 64 },
    tag     : { type: "text", size: 128 }
    }, {
      id: 'tag_id' // auto generate a UUID as the default interaction.id here is not unique
  });

  // LINKS
  db.define('links', {
    id      : { type: "text", size: 64 },
    title   : { type: "text", size: 250 },
    url     : { type: "text", size: 250 }
  });
  


  
  return cb();
};
