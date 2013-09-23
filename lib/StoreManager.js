  'use strict';
  var StoreManager
  , strftime 	= require('strftime')
  ;

StoreManager = function StoreManager() {

};

StoreManager.fn = StoreManager.prototype;

// Process the inbound data
StoreManager.fn.process = function (inbound) {

	try {
		//data.time = strftime('%F %T', new Date());
		var body = inbound.rawBody.split(/\r?\n/);
		for (var i in body) {
    	if (body.hasOwnProperty(i)) {
      	console.log("**************" + body[i] + "\n");
    	}
		}
  } catch (e){
  	console.log('DEBUG: ' + e);
  }
  
};

StoreManager.fn.get = function () {
  return true;
};

module.exports = StoreManager;