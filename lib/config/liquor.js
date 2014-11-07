var liquor = require('liquor');
var fs = require('fs');

module.exports = function liquorConfig(){
	var out = {};

	out.engine = liquor;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			fn(null, liquor.compile(template, options)(options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(template, options){
		return liquor.compile(template, options)(options);
	};

	return out;
};