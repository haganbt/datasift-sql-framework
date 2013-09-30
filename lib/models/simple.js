
/*
 * SIMPLE - An example model designed for simplicity 
 */


/* 
 * See https://github.com/dresende/node-orm2/wiki
 * 
 * TYPES: The supported types are:
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
   
  return cb();
};
