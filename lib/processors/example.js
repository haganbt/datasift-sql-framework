'use strict';

function Example() {

	Example.fn = Example.prototype;
	
	/*
	 * PROCESS: called each time a new interaction is received
	 * 
	 * @param - function 	- inherit model functions - get, create, find, count etc
	 * @param - object 		- JSON data for the current interaction
	 * @param - string 		- interaction id of the current interaction
	 * @param - string 		- formated date derived from interaction.created_at
	 * 
	 */
	Example.fn.process = function (models, item, id, ts) {
	  
	  
		if(item.interaction && models.interaction){
			
			// insert data in to the interaction table
			models.interaction.create([item.interaction], function (err, items) {
				 	if (err){
				 		console.log("ERROR: Insert failed for INTERACTION: ", err);
				 	} else {
				 		console.log("Inserted data: ", JSON.stringify(items));
				 	}
			});
			
		}
	  
	  
	  
	};

};

module.exports = Example;
