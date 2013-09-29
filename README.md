datasift-sql-framework
======================

**STATUS: Unstable - work in progress**

DataSift HTTP Push REST endpoint with SQL persistence. 

Features:
* An HTTP REST endpoint for DataSift push delivery
* An extensible framework to support custom DB models and custom data processing requirements
* Default example schemas
* Utilizes node-orm2 with support for MySQL, PostgreSQL, Amazon Redshift, SQLite, MongoDB

### Database Schema

Schemas are defined using model files located within <code>/lib/models</code> directory. 

Simply set which model to use within <code>/lib/config/model.json</code>.

**simple**

A basic schema designed for simplicity.

**complete**

A rich schema flattening all data objects in to associated tables.

### Processors

A processor is a file that is called when each new interaction is received. These are located in <code>/lib/processors</code>.

Processors are used to manipulate and process the incoming data and preform tasks such as inserting in to the database.


### Custom Schema

Creating a custom schema can be done by creating a new model file within the <code>/lib/models</code> directory.

Configure the model to be used by setting the name within <code>/lib/config/model.json</code> file.

As default, the "default" processor will be used for new models. 

### Default Processor

The default processor is a generic processor that will attempt to guess what data to insert in to appropriate tables. It does this by assuming that the table and fields defined in the model file are named acording to the associated DataSift JSON objects. For example:

 - twitter.user data object maps to the twitter_user table
 - interaction object data object maps to the interaction table
 - twitter.retweet data object maps to the twitter_retweet
 
Keep this naming convention in mind when creating new models and using the default processor. 

### Custom Processors

It is possible (and advised) to create an associated processor to acompany a model. As default behaviour, the "default" processor will be used for any custom models. 
To override this behaviour, simply create a processor file within the <code>/lib/processor</code> directory, and name it identically to the model.

For example, if the model file is named <code>/lib/models/brand-monitor.js</code>, the associated processor should be named <code>/lib/processors/brand-monitor.js</code>.

See <code>/lib/processor/example.js</code> for a starting template.  

### Installation
* Edit the DB config settings within <code>/lib/config/database.json</code>
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:8080/data with new line delimited JSON format.
* Start app - <code>node app.js</code>