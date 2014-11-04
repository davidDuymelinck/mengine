var fs = require('fs');

module.exports = function mengine(engineName, configLocation){
	var customConfig = configLocation || null;

	if(customConfig !== null){
		return require(customConfig)();
	}

	var engineConfig = __dirname + '/config/' + engineName + '.js';

	if(fs.existsSync(engineConfig)){
		return require(engineConfig)();
	};

	var out = {},
		engine = require(engineName);

	out.engine = engine;

	if(typeof engine.renderFile == 'function'){
		out.renderFile = engine.renderFile;
	}

	if(typeof engine.render == 'function'){
		out.render = engine.render;
	}

	return out;
};