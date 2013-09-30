'use strict';

/********************************************************************************
 *	Default Processor - The default processor will be used if a custom processor
 * 	is not found. Supports the "complete" model.
 * 
 *	The default processor will attempt to insert to a set of default models based
 * 	on the assumption that each model is likely to be named after the associated
 * 	DataSift data object. For example:
 * 
 * 		- twitter.user object -> 	twitter_user table
 * 		- interaction object 	-> 	interaction table
 * 		- twitter.retweet			->	twitter_retweet
 *
 ********************************************************************************/



function Complete() {

	Complete.fn = Complete.prototype;
	
	/*
	 * PROCESS: called each time a new interaction is received
	 * 
	 * @param - function 	- inherit model functions - get, create, find, count etc
	 * @param - object 		- JSON data for the current interaction
	 * @param - string 		- interaction id of the current interaction
	 * @param - string 		- formated date derived from interaction.created_at
	 * 
	 */
	Complete.fn.process = function (models, item, id, ts) {
	 
		// INTERACTION
		if(item.interaction && models.interaction){
			
			// Extract GEO
			if(item.interaction.geo && item.interaction.geo.latitude && item.interaction.geo.longitude){
					item.interaction.longitude = item.interaction.geo.longitude;
					item.interaction.latitude = item.interaction.geo.latitude;
			}	
			
			models.interaction.create([item.interaction], function (err, items) {
				 	if (err) console.log("ERROR: Insert failed for INTERACTION: ", err); 	
			});
		}

		// TWITTER_USER
		if(item.twitter && !item.twitter.retweet && item.twitter.user && models.twitter_user){

		  item.twitter.user.twitter_id = item.twitter.id;
		 	item.twitter.user.id = id;
		 	item.twitter.user.created_at = ts;

			models.twitter_user.create([item.twitter.user], function (err, items) {
				 	if (err) console.log("ERROR: Insert failed for TWITTER_USER: ", err);
			});
		}

		// TWITTER_PLACE
		if(item.twitter && !item.twitter.retweet && item.twitter.place && models.twitter_place){

		  item.twitter.place.twitter_place_id = item.twitter.place.id;
		  item.twitter.place.id = id;

			models.twitter_place.create([item.twitter.place], function (err, items) {
				 	if (err) console.log("ERROR: Insert failed for TWITTER_PLACE: ", err);		
			});
		}

		// TWITTER_MENTION - list items
		if(item.twitter && item.twitter.mentions && item.twitter.mention_ids && models.twitter_mention){
			for (var y in item.twitter.mentions) {
				if (item.twitter.mentions.hasOwnProperty(y) && item.twitter.mention_ids.hasOwnProperty(y)) {
					var eachMention 				= {};
					eachMention.id 					= id;
					eachMention.user_id			= item.twitter.mention_ids[y];
					eachMention.screen_name = item.twitter.mentions[y];
					eachMention.created_at 	= ts;
					
					models.twitter_mention.create(eachMention, function (err, items) {
						if (err) console.log("ERROR: Insert failed for LINKS: ", JSON.stringify(err));
					});
				}
			}
		}

		// TWITTER_RETWEET
		if(item.twitter && item.twitter.retweet && models.twitter_retweet){

		  item.twitter.retweet.twitter_id = item.twitter.retweet.id;
		  item.twitter.retweet.id = id;
			item.twitter.retweet.created_at = ts;
		  
			models.twitter_retweet.create([item.twitter.retweet], function (err, items) {
				 	if (err) console.log("ERROR: Insert failed for TWITTER: ", err);
			});
		}
						
		// TWITTER
		if(item.twitter && !item.twitter.retweet && models.twitter){

		  item.twitter.twitter_id = item.twitter.id;
		  item.twitter.id = id;
		  item.twitter.created_at = ts;
		  
		  // Extract GEO
			if(item.twitter.geo && item.twitter.geo.latitude && item.twitter.geo.longitude){
					item.twitter.longitude = item.twitter.geo.longitude;
					item.twitter.latitude = item.twitter.geo.latitude;
			}
		  
			models.twitter.create([item.twitter], function (err, items) {
				 	if (err) console.log("ERROR: Insert failed for TWITTER: ", err);
			});
		}

		// LINKS - list items
		if(item.links && item.links.url && typeof(item.links.url) === 'object' && models.links){
			for (var z in item.links.url) {
				if (item.links.title.hasOwnProperty(z) && item.links.url.hasOwnProperty(z)) {
					
					var eachLink 		= {};
					eachLink.id 		= id;
					eachLink.title	= item.links.title[z];
					eachLink.url 		= item.links.url[z];
					
					models.links.create(eachLink, function (err, items) {
						if (err) console.log("ERROR: Insert failed for LINKS: ", JSON.stringify(err));
					});
				}
			}
		}

		// INTERACTION_TAGS - list items
		if(item.interaction.tags && typeof(item.interaction.tags) === 'object' && models.interaction_tags){
			for (var t in item.interaction.tags) {
				if (item.interaction.tags.hasOwnProperty(t)) {
					
					var eachTag		= {};
					eachTag.id		= id;
					eachTag.tag		= item.interaction.tags[t];
					
					models.interaction_tags.create(eachTag, function (err, items) {
						if (err) console.log("ERROR: Insert failed for INTERACTION_TAGS: ", JSON.stringify(err));
					});
				}
			}
		}
		
			 
	};

};

module.exports = Complete;
