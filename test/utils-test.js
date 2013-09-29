var   vows 		= require('vows')
    , assert 	= require('assert')
    , utils   = require('../lib/utils')
    ;

vows.describe('SQL framework utils').addBatch({
    'loading a custom processor that does not exist': {
         topic: function () {
	        return utils.loadProcessor('foo');
         },
        'the default processor is returned': function (topic) {
        	assert.isString(topic);
        	assert.deepEqual(topic, '../lib/processors/default');
        }
   },
   
    'loading a processor that exists': {
         topic: function () { 
	        return utils.loadProcessor('example');
         },
        'the specified processor is returned': function (topic) {
        	assert.isString(topic);
        	assert.deepEqual(topic, '../lib/processors/example');
        }
    },    
    
}).export(module);