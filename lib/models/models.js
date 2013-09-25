module.exports = function (db, cb) {
  
  // Interaction
  db.define('interaction', {
 			id 					: { type: "text", size: 128 },
 			created_at 	: Date,
      content    	: { type: "text", size: 1024 },
      type 				: { type: "text", size: 50 },
      tags 				: Object
  });
  
  // Tags - list items
  db.define('tags', {
  	id 			: { type: "text", size: 128 },
   	tag    	: { type: "text", size: 128 }
  }, {
    id: 'UUID' // auto generate a UUID as the default here is not unique
});

  // Links
  db.define('links', {
  	id 			: { type: "text", size: 128 },
  	title 	: { type: "text", size: 256 },
   	url    	: { type: "text", size: 512 }
  });
  
  
  // Twitter
  db.define('twitter', {
  	id 					: { type: "text", size: 128 },
 		created_at 	: Date,  	
  	text 				: { type: "text", size: 256 },
  	retweet 		: Object,
  	user				: Object,
  	name				: { type: "text", size: 175 }
  });
  /*
  
  // Twitter
  db.define('twitter', {
  	id 			: { type: "text", size: 128 },
 		created_at 	: Date,  	
  	text 		: { type: "text", size: 256 },
  	retweet : Object,
  	user		: { type: "text", size: 256 },
  	name		: { type: "text", size: 128 },
  	description		: { type: "text", size: 256 },
  	statuses_count		: { type: "text", size: 128 },
  	followers_count		: { type: "text", size: 128 },
  	friends_count		: { type: "text", size: 128 },
  	id_str		: { type: "text", size: 128 },
  	screen_name		: { type: "text", size: 128 },
  	profile_image_url		: { type: "text", size: 128 },
  	lang		: { type: "text", size: 128 },
  	location		: { type: "text", size: 128 },
  	profile_image_url_https		: { type: "text", size: 512 },
  	listed_count	:	{ type: "text", size: 128 },
  	favourites_count	:	{ type: "text", size: 128 },
  	time_zone		: { type: "text", size: 512 },
  	geo_enabled		: { type: "text", size: 128 },
  	verified		: { type: "text", size: 128 },   	
  	source		: { type: "text", size: 128 },
  	count		: { type: "text", size: 128 },  	  	
  	field_list		: { type: "text", size: 128 }  	
  });

  */
  return cb();
};
