datasift-sql-framework
======================

**STATUS: Unstable - work in progress**

DataSift HTTP Push REST endpoint with SQL persistence. 

Features:
* An HTTP REST endpoint for DataSift push delivery
* An extensible framework to support custom DB models and custom data processing requirements
* Default example schemas
* Utilizes node-orm2 with support for MySQL, PostgreSQL, Amazon Redshift, SQLite, MongoDB

## Sample Database Schemas


**complete**

A complex schema designed for maximum data coverage.

**simple** (default)

A basic schema designed for simplicity.

**example**

A sample extension that can be used to easily create a new extension.


## Extension Framework

An extension is made up of a model file and an optional processor file. If no processor file is defined, the default processor will be automatically used.

To create a new extension (custom model and optional processor):

* Create a new folder within the <code>/extension</code> directory e.g. <code>/extension/brand-monitor</code>.
* Edit the <code>/lib/config/extension.json</code> file and set the <code>definition_name</code> parameter to be the same name used for the extention folder e.g. 'brand-monitor'.

* Create a model.js file within the new extension folder e.g. <code>/extension/brand-monitor/model.js</code>.


At this point, starting the application would use the new model file, and the default processor. To overwrite the default processor:

* Create a processor.js file e.g. <code>/extension/brand-monitor/processor.js</code>.

Restarting the application will load the new processor.

NOTE: An example extension can be found within the <code>/extension/example</code> directory. This can be used to copy/paste as a starting point for a new extension.


### Custom Models

TODO

The supported types are:

- `text`: A text string;
- `number`: A number value;
- `boolean`: A true/false value;
- `date`: A date object;
- `enum`: A value from a list of possible values;
- `object`: A JSON object;
- `point`: A N-dimensional point (not generally supported);
- `binary`: Binary data.

```javascript
module.exports = function (db, cb) {
  
  // interaction table
  db.define('interaction', {
    id          : { type: "text", size: 64 },
    content     : { type: "text", size: 1024 },
  	created_at  : Date
  });
  
  return cb();
};
```

### Custom Processors

Processors manage the behavior of the incoming data. A typical behavior is to insert the data in to the database however there are no restriction on what can be done within the processor.

A processor must expose a <code>process</code> method. This is called with each new data interaction. As default, the <code>process</code> method inherits 4 data items - a list of models (defined in the extension model file), the raw JSON data object, the interaction.id and a timestamp (generated from interaction.created_at).

An example processor may look like:

```javascript
function Example() {

	Example.fn = Example.prototype;
	
	Example.fn.process = function (models, item, id, ts) {
		// processor logic
	};

};

module.exports = Example;
```

Since the framework extends Node ORM (https://github.com/dresende/node-orm2), all of the Node ORM helper methods are available inside of a processor. For example, to insert the <code>interaction</code> data in to the <code>interaction</code> table:

```javascript
models.interaction.create([item.interaction], function (err, items) {
	 	if (err){
	 		console.log("ERROR: Insert failed for INTERACTION: ", err);
	 	}
});
```

Node ORM also supports aggregation methods such as min, max, avg, sum, count.

### Default Processor

TODO

### Installation
* Edit the DB config settings within <code>/lib/config/database.json</code>
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:8080/data with new line delimited JSON format.
* Start app - <code>node app.js</code>