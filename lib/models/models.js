module.exports = function (db, cb) {
  
  // Interaction
  db.define('interaction', {
 			id : { type: "text", size: 128 },
 			created_at : Date,
      content    : { type: "text", size: 1024 },
      type : { type: "text", size: 50 }
  });
  

  // Tags
  db.define('tags', {
   tags    : { type: "text", size: 128 }
  });

  return cb();
};
