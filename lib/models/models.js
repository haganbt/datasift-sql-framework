module.exports = function (db, cb) {
  
  // Interaction
  db.define('interaction', {
      name    : { type: "text", size: 512 },
      created_at : Date
  });
  
  // Tags
  db.define('tags', {
   name    : { type: "text", size: 128 }
  });

  return cb();
};
