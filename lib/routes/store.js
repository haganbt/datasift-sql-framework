(function () {
  'use strict';   
  var StoreManager = require('../StoreManager');

  module.exports = function (modules) {
    var storeManager = new StoreManager;

    return {
      show: function (request, response) {
      response.render('index', { title: 'Express' });
    },

    save: function (request, response) {
      storeManager.process(request);
      return response.send(200, {"success":true});
    },

    reset: function (request, response) {
      console.log("reset called");
        storeManager.reset( function(err) {
					if(err) console.log("ERROR!!!!!!!!!!!!!!!");
				});

      
      
      return response.send(200, {"success":true});
    }
       
    };
  };
})();
