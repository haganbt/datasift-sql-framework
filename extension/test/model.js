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
  
  return cb();
};
