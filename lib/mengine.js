module.exports = function(engineName, configLocation){
	var customConfig = configLocation || null;

	var engine = require(engineName);

	this.engine = engine;

	if(customConfig){
		return require(customConfig)(this);
	}

	if(typeof engine.renderFile == 'function'){
		this.renderFile = engine.renderFile;
	}

	if(typeof engine.render == 'function'){
		this.render = engine.render;
	}

	return this;
};