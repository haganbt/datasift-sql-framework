/*
 * SIMPLE - An example processor and model designed for simplicity 
 */

module.exports = function (db, cb) {

  // INTERACTION
  db.define('interaction', {
    id          : { type: "text", size: 64 },
    created_at  : Date,
    content     : { type: "text", size: 1024 },
    link		 		: { type: "text", size: 250 },    	
    source	 		: { type: "text", size: 20 },     	
    title       : { type: "text", size: 250 },    	
    type        : { type: "text", size: 50 },
    latitude  	: Number,
    longitude  	: Number,
  	type        : { type: "text", size: 20 },
  });

  // HASHTAGS
  db.define('hashtags', {
    id          : { type: "text", size: 64 },
    created_at  : Date,
    hashtag		 	: { type: "text", size: 128 },
    }, {
      id: 'hashtag_id' // auto generate a UUID as the default interaction.id here is not unique
  });
  
  // MENTIONS
  db.define('mentions', {
    id          : { type: "text", size: 64 },
    created_at  : Date,
    mention		 	: { type: "text", size: 128 },
    }, {
      id: 'mention_id' // auto generate a UUID as the default interaction.id here is not unique
  });  

 	// TAGS
  db.define('tags', {
    id      		: { type: "text", size: 64 },
    created_at  : Date,    
    tag     		: { type: "text", size: 128 }
    }, {
      id: 'tag_id' // auto generate a UUID as the default interaction.id here is not unique
  });

  // LINKS
  db.define('links', {
    id      		: { type: "text", size: 64 },
    created_at  : Date,    
    title   		: { type: "text", size: 250 },
    url     		: { type: "text", size: 250 }
    }, {
      id: 'links_id' // auto generate a UUID as the default interaction.id here is not unique
  });

  // TWITTER
  db.define('twitter', {
    id                    	: { type: "text", size: 64 },
    twitter_id            	: { type: "text", size: 128 },
    created_at  						: Date,
    is_retweet  						: { type: "boolean", defaultValue: 0 },
    text                  	: { type: "text", size: 256 },    
  	latitude  							: Number,
    longitude  							: Number,
    lang 				           	: { type: "text", size: 4 },    
    in_reply_to_screen_name	: { type: "text", size: 20 },
    in_reply_to_status_id   : { type: "text", size: 100 },
    in_reply_to_user_id     : { type: "text", size: 30 },
    user_name            		: { type: "text", size: 128 },
    user_screen_name       	: { type: "text", size: 20 },
 		user_description        : { type: "text", size: 200 },
  	user_followers_count  	: Number,
    user_friends_count  		: Number, 
   	user_statuses_count  		: Number,
    user_location     			: { type: "text", size: 100 }, 
    user_time_zone       		: { type: "text", size: 20 },	          
  });   
  
  
  return cb();
};
