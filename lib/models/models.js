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
  
  // Interaction
  db.define('interaction', {
      id          : { type: "text", size: 128 },
      created_at  : Date,
      content     : { type: "text", size: 1024 },
      type        : { type: "text", size: 50 },
      tags        : Object
  });
  
  // Tags - list items
  db.define('tags', {
    id      : { type: "text", size: 128 },
    tag     : { type: "text", size: 128 }
    }, {
      id: 'tag_id' // auto generate a UUID as the default interaction.id here is not unique
  });

  // Links
  db.define('links', {
    id      : { type: "text", size: 128 },
    title   : { type: "text", size: 256 },
    url     : { type: "text", size: 512 }
  });
  
  // Twitter
  db.define('twitter', {
    id                    : { type: "text", size: 128 },
    twitter_id            : { type: "text", size: 48 },
    twitter_retweeted_id  : { type: "text", size: 48 },
    text                  : { type: "text", size: 256 }
  });

  
  return cb();
};
