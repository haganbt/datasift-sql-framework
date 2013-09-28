'use strict';
var fs 			= require('fs');

module.exports = {

  loadConfig: function() {
		var data = fs.readFileSync('./lib/config/database.json'),
	    myObj;
	
	  try {
	  	myObj = JSON.parse(data);
			return myObj;
	  }
	  catch (err) {
	    throw new Error('Error parsing JSON config file.')
	  }
  },
  
  
  /*
   * Format the DS created_at timestamp
   * for a DB Date field.
   * 
   * @param - string
   */
	dateFormat: function(dateString) {

		try {

			var mSec = Date.parse(dateString);
			var date = new Date(mSec);
			date = date.getUTCFullYear() + '-' +
			    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
			    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
			    ('00' + date.getUTCHours()).slice(-2) + ':' + 
			    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
			    ('00' + date.getUTCSeconds()).slice(-2);
			return(date);
						
		} catch (e) {
			console.log('ERROR: Unable to parse time sting. ' + e);
			return null;
		}
	},
};
