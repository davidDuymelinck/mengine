var ejs = require('ejs');
var fs = require('fs');

module.exports = function ejsConfig(){
	ejs.open = '{{';
	ejs.close = '}}';

	var out = {};

	out.engine = ejs;

	out.renderFile = function(path, options, fn){
		ejs.renderFile(path, addCache(options), fn);
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return ejs.render(template, options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options){
		try{
			return ejs.render(str, options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	out.renderStringSync = ejs.render;

	return out;

	function addCache(options){
		if(typeof options === 'object'){
			options.cache = true;
		}

		return options;
	}
};