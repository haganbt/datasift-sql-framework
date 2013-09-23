module.exports = function (db, cb) {
  
  // Interaction
  db.define('interaction', {
      "interaction.content"    : { type: "text", size: 512 },
      "interaction.created_at" : Date
  });
  
  // Tags
  db.define('tags', {
   name    : { type: "text", size: 128 }
  });

  return cb();
};
