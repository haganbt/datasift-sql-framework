datasift-sql-framework
======================

**STATUS: Unstable - work in progress**

DataSift HTTP Push REST endpoint with SQL persistence. Utilizes node-orm2 with support for:

* MySQL
* PostgreSQL
* Amazon Redshift
* SQLite
* MongoDB

### Schema

The <code>interaction.id</code> is used exclusively across all tables as a primary key, with the exception of list tables where duplicate interaction.id's are supported. 

**List Tables**

Interactions containing list items can contain multiple values. For example, and interaction containing a link, may have the following URL property:
```javascript
{
    "url": [
        "http://will.i.am",
        "http://adk-radio.net"
    ]
}
```
This implementation extracts each of these to seperate records and hence duplicate interaction id's can be present in list tables. The <code>LINKS</code> table entrances for the aboveexample may look like:

```
+----------------------------------+-----------+----------------------+----------+
| id                               | title     | url                  | links_id |
+----------------------------------+-----------+----------------------+----------+
| 1e2dac687b98ab80e07485ec9351e3b6 | will.i.am | http://will.i.am     |        1 |
| 1e2dac687b98ab80e07485ec9351e3b6 | ADK Radio | http://adk-radio.net |        2 |
+----------------------------------+-----------+----------------------+----------+
```
Current list tables are:

* <code>LINKS</code>
* <code>TAGS</code>



### Installation
* Edit the DB config settings within /lib/config/database.json
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:8080/data with new line delimited JSON format.
* Start app - <code>node app.js</code>

### Todo
* Support for multiple models e.g. simple, complete and use case specific
