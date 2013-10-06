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

		// hashtags
		if(item.interaction && item.interaction.hashtags && typeof(item.interaction.hashtags) === 'object' && models.hashtags){
			for (var h in item.interaction.hashtags) {
				if (item.interaction.hashtags.hasOwnProperty(h)) {
					var eachHashtag 				= {};
					eachHashtag.id 					= id;
					eachHashtag.created_at 	= ts;
					eachHashtag.hashtag			= item.interaction.hashtags[h];
					models.hashtags.create(eachHashtag, function (err, items) {
						if (err) console.log("ERROR: Insert failed for HASHTAGS: ", JSON.stringify(err));
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
		
		// twitter - merge tweets and retweets
		if(item.twitter && typeof(item.twitter) === 'object' && models.twitter){
			
			// tweets
			item.twitter.twitter_id = item.twitter.id;
			item.twitter.id 				= id;
			item.twitter.created_at = ts;
		
			// user
			if(item.twitter.user){
				item.twitter.user_screen_name 			= item.twitter.user.screen_name;
				item.twitter.user_name 							= item.twitter.user.name;
				item.twitter.user_description 			= item.twitter.user.description;
				item.twitter.user_followers_count 	= item.twitter.user.followers_count;
				item.twitter.user_friends_count 		= item.twitter.user.friends_count;
				item.twitter.user_statuses_count 		= item.twitter.user.statuses_count;
				item.twitter.user_location			 		= item.twitter.user.location;
				item.twitter.user_time_zone			 		= item.twitter.user.time_zone;
			}
			
			// retweets
			if(item.twitter.retweet){
				
				item.twitter.text 			= item.twitter.retweet.text;
				item.twitter.is_retweet = 1;
				
				// retweet user
				item.twitter.user_screen_name 			= item.twitter.retweet.user.screen_name;
				item.twitter.user_description 			= item.twitter.retweet.user.description;
				item.twitter.user_followers_count 	= item.twitter.retweet.user.followers_count;
				item.twitter.user_friends_count 		= item.twitter.retweet.user.friends_count;
				item.twitter.user_statuses_count 		= item.twitter.retweet.user.statuses_count;
				item.twitter.user_location			 		= item.twitter.retweet.user.location;
				item.twitter.user_time_zone			 		= item.twitter.retweet.user.time_zone;
			}
		
			
			models.twitter.create(item.twitter, function (err, items) {
				if (err) console.log("ERROR: Insert failed for LINKS: ", JSON.stringify(err));
			});
		}	 
	  
	};

};

module.exports = Simple;
