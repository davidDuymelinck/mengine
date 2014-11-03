var fs = require('fs');

module.exports = function mengine(engineName, configLocation){
	var customConfig = configLocation || null;

	var engine = require(engineName);

	if(customConfig){
		return require(customConfig)();
	}

	var engineConfig = __dirname + '/config/' + engineName + '.js';

	try{
		var stat = fs.statSync(engineConfig);

		return require(engineConfig)();
	}catch (err){
		var self = {};

		self.engine = engine;

		if(typeof engine.renderFile == 'function'){
			self.renderFile = engine.renderFile;
		}

		if(typeof engine.render == 'function'){
			self.render = engine.render;
		}

		return self;
	};
};

