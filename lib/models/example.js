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
  
  // interaction table
  db.define('interaction', {
    id          : { type: "text", size: 64 },
    content     : { type: "text", size: 1024 },
  	created_at  : Date
  });
  
  return cb();
};
