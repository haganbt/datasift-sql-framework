datasift-sql
==============

**STATUS: Unstable - work in progress**

DataSift HTTP Push REST endpoint with SQL persistence. Utilises node-orm2 with support for:

* MySQL
* PostgreSQL
* Amazon Redshift
* SQLite
* MongoDB

### Schema

**LINKS**
Interactions containing links can contain multiple items, for example:
```javascript
{
    "url": [
        "http://will.i.am",
        "http://adk-radio.net"
    ]
}
```
This implementation extracts each of these to seperate records and hence duplicate interaction id's can be present in this table.

### Installation
* Install package dependencies - <code>npm install</code>
* Configure a DataSift HTTP Push endpoint to http://[your_host.com]:3000/data with new line delimited JSON format.
