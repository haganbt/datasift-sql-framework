datasift-sql-framework
======================

**STATUS: Unstable - work in progress**

DataSift HTTP Push REST endpoint with SQL persistence. 

Features:
* An HTTP REST endpoint for DataSift push delivery
* An extensible framework to support custom DB models and custom data processing requirements
* Default example schemas
* Utilizes node-orm2 with support for MySQL, PostgreSQL, Amazon Redshift, SQLite, MongoDB

## Database Schema


**complete**

TODO

**simple**

TODO

**template**

TODO


## Extension Framework

An extension is made up of a model file and an optional processor file. If no processor file is defined, the default processor will be automatically used.

To create a new extension (custom model and optional processor):

* Create a new folder within the <code>/extension</code> directory e.g. <code>/extension/brand-monitor</code>.
* Create a model file using the same name as the folder, with a '.model.js' extention e.g. <code>/extension/brand-monitor/brand-monitor.model.js</code>.
* Edit the <code>/lib/config/extension.json</code> file and set the <code>definition_name</code> parameter to be the same name used for the extention folder e.g. 'brand-monitor'.

At this point, starting the application would use the new model file, and the default processor. To overwrite the default processor:

* Create a processor file using the same name as the folder, with a '.processor.js' extention e.g. <code>/extension/brand-monitor/brand-monitor.processor.js</code>.

Restarting the application will load the new processor.

NOTE: A template extension can be found within the <code>/extension/template</code> directory. This can be used to copy/paste as a starting point for a new extension.


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

TODO

```javascript
function Example() {

	Example.fn = Example.prototype;
	
	Example.fn.process = function (models, item, id, ts) {
		// processor logic
	};

};

module.exports = Example;
```

### Default Processor

TODO

### Installation
* Edit the DB config settings within <code>/lib/config/database.json</code>
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:8080/data with new line delimited JSON format.
* Start app - <code>node app.js</code>