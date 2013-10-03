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

Schemas are defined using model files. To create a custom model, an extension can be created within the <code>/extension</code> directory.




## Extension Framework

An extension is amde up of a model file and an optional processor file. If no processor file is defined, the default processor will be used.

To create a custom model and optional processor:

* Create a new folder within the <code>/extension</code> directory e.g. <code>/extension/brand-monitor</code>.
* Create a model file using the same name as the folder, with a '.model.js' extention e.g. <code>/extension/brand-monitor/brand-monitor.model.js</code>.
* Edit the <code>/lib/config/extension.json</code> file and set the <code>definition_name</code> parameter to be the same name used for the extention folder e.g. 'brand-monitor'.

### Custom Models


The supported types are:

- `text`: A text string;
- `number`: A number value;
- `boolean`: A true/false value;
- `date`: A date object;
- `enum`: A value from a list of possible values;
- `object`: A JSON object;
- `point`: A N-dimensional point (not generally supported);
- `binary`: Binary data.

```json
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

A processor is a file that is called when each new interaction is received. These are located in <code>/lib/processors</code>.

Processors are used to manipulate and process the incoming data and preform tasks such as inserting in to the database.


### Custom schemas and processors

To create a new schema and associated processor:

* Create a new model file: e.g. <code>/lib/models/brand-monitor.js</code>
* Creat an associated processor file e.g. <code>/lib/processors/brand-monitor.js</code>
* Configure the model to use within <code>/lib/config/model.json</code>.

**NOTE: both the model file and associated processor file must be created with identical names.**



### Installation
* Edit the DB config settings within <code>/lib/config/database.json</code>
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:8080/data with new line delimited JSON format.
* Start app - <code>node app.js</code>