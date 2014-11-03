var ejs = require('ejs');

module.exports = function ejsConfig(){
	ejs.open = '{{';
	ejs.close = '}}';

	var out = {};

	out.engine = ejs;

	out.renderFile = function renderFile(path, options, fn){
		ejs.renderFile(path, addCache(options), fn)
	}

	out.render = ejs.render;

	return out;

	function addCache(options){
		if(typeof options === 'object'){
			options.cache = true;
		}

		return options;
	}
};