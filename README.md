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

Schemas are defined using model files located within <code>/lib/models</code> directory. Simply set which model to use within <code>/lib/config/model.json</code>.


### Processors

A processor is a file that is called when each new interaction is received. These are located in <code>/lib/processors</code>.

Processors are used to manipulate and process the incoming data and preform tasks such as inserting in to the database.


### Custom Processor and Schemas

To create a new schema:

* Create a new model file: e.g. <code>/lib/models/brand-monitor.js</code>
* Creat an associated processor file e.g. <code>/lib/processors/brand-monitor.js</code>
* Configure the model to use within <code>/lib/config/model.json</code>.

**NOTE: both the model file and associated processor file must be created with identical names.**



### Installation
* Edit the DB config settings within <code>/lib/config/database.json</code>
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:8080/data with new line delimited JSON format.
* Start app - <code>node app.js</code>