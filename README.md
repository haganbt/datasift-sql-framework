datasift-sql-framework
======================

**STATUS: Unstable - work in progress**

DataSift HTTP Push REST endpoint with SQL persistence. Utilizes node-orm2 with support for:

* MySQL
* PostgreSQL
* Amazon Redshift
* SQLite
* MongoDB

### Schemas

**example** 	- simple example schema for getting started
**complete** 	- schema supporting all current data properties


### Installation
* Edit the DB config settings within /lib/config/database.json
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:8080/data with new line delimited JSON format.
* Start app - <code>node app.js</code>