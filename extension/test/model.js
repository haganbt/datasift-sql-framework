// test model used for testing the default processor

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
  
  // TWITTER
  db.define('twitter', {
    id                      : { type: "text", size: 64 },
    twitter_id              : { type: "text", size: 128 },
    created_at              : Date,
    latitude                : Number,
    longitude               : Number,
    lang                    : { type: "text", size: 4 },    
    in_reply_to_screen_name : { type: "text", size: 20 },
    in_reply_to_status_id   : { type: "text", size: 100 },
    in_reply_to_user_id     : { type: "text", size: 30 },
    source                  : { type: "text", size: 100 },
    status                  : { type: "text", size: 200 },
    text                    : { type: "text", size: 256 }
  });
  
/*
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
 */  
  return cb();
};
