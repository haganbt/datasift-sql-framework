module.exports = function (db, cb) {
  
  // Interaction
  db.define('interaction', {
 			id 					: { type: "text", size: 128 },
 			created_at 	: Date,
      content    	: { type: "text", size: 1024 },
      type 				: { type: "text", size: 50 },
      tags 				: Object
  });
  
  // Tags
  db.define('tags', {
  	id 			: { type: "text", size: 128 },
   	tag    	: { type: "text", size: 128 }
  });

  // Links
  db.define('links', {
  	id 			: { type: "text", size: 128 },
  	title 	: { type: "text", size: 256 },
   	url    	: { type: "text", size: 512 }
  });
  
  
  return cb();
};
