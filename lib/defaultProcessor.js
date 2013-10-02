'use strict';

function Simple() {

	Simple.fn = Simple.prototype;
	

	Simple.fn.process = function (models, item, id, ts) {

		// top level items
		for (var l1 in item) {

			if(item.hasOwnProperty(l1) && typeof(item[l1]) === 'object' && models[l1]){

				// timestamp
				item[l1].created_at = ts;
				// if we have an id in the data, switch that to PROPERTY_id
				if(item[l1].id !== undefined && l1 !== 'interaction'){
				  item[l1][l1 + '_id'] = item[l1].id;
				}
				// interaction id
				item[l1].id = id;

				// Insert to DB
				models[l1].create(item[l1], function (err, items) {
					if (err) console.log("ERROR: ", JSON.stringify(err));
				});	
			
			}	
			
		}
	  
	};

};

module.exports = Simple;
