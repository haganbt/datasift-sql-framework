'use strict';

function Simple() {

	Simple.fn = Simple.prototype;
	

	Simple.fn.process = function (models, item, id, ts) {


		// top level items
		for (var l1 in item) {
				
				if(item.hasOwnProperty(l1) && typeof(l1) === 'object' && models[l1]){

					
					// Insert to DB
					models[l1].create(item[l1], function (err, items) {
						if (err) console.log("ERROR: ", JSON.stringify(err));
					});	
				
			}	
			
			
		}



		// [twitter.user, twitter.retweet]
		
			

		/*
	  
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

*/	  
	};

};

module.exports = Simple;
