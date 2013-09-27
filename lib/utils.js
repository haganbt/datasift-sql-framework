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
};
