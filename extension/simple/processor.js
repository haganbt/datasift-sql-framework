/*
 * SIMPLE - An example processor and model designed for simplicity 
 */

'use strict';

function Simple() {

	Simple.fn = Simple.prototype;
	
	/*
	 * PROCESS: called each time a new interaction is received
	 * 
	 * @param - function 	- inherit model functions - get, create, find, count etc
	 * @param - object 		- JSON data for the current interaction
	 * @param - string 		- interaction id of the current interaction
	 * @param - string 		- formated date derived from interaction.created_at
	 * 
	 */
	Simple.fn.process = function (models, item, id, ts) {
	  
		// tags
		if(item.interaction.tags && typeof(item.interaction.tags) === 'object' && models.tags){
			for (var t in item.interaction.tags) {
				if (item.interaction.tags.hasOwnProperty(t)) {
					var eachTag					= {};
					eachTag.id					= id;
					eachTag.created_at 	= ts;					
					eachTag.tag					= item.interaction.tags[t];
					models.tags.create(eachTag, function (err, items) {
						if (err) console.log("ERROR: Insert failed for INTERACTION_TAGS: ", JSON.stringify(err));
					});
				}
			}
		}	
		
		// interaction			  
		if(item.interaction && models.interaction){
			
			// inject the formatted timestamp
			item.interaction.created_at = ts;
			
			// Extract GEO
			if(item.interaction.geo && item.interaction.geo.latitude && item.interaction.geo.longitude){
					item.interaction.longitude = item.interaction.geo.longitude;
					item.interaction.latitude = item.interaction.geo.latitude;
			}	
			
			models.interaction.create([item.interaction], function (err, items) {
				 	if (err) console.log("ERROR: Insert failed for INTERACTION: ", err); 	
			});
		}
	  
		// links
		if(item.links && item.links.url && typeof(item.links.url) === 'object' && models.links){
			for (var z in item.links.url) {
				if (item.links.title.hasOwnProperty(z) && item.links.url.hasOwnProperty(z)) {
					var eachLink 				= {};
					eachLink.id 				= id;
					eachLink.created_at = ts;
					eachLink.title			= item.links.title[z];
					eachLink.url 				= item.links.url[z];
					models.links.create(eachLink, function (err, items) {
						if (err) console.log("ERROR: Insert failed for LINKS: ", JSON.stringify(err));
					});
				}
			}
		}  
	  
	};

};

module.exports = Simple;
