var underscore = require('underscore');
var fs = require('fs');

module.exports = function lodashConfig(){
	var out = {};

	underscore.templateSettings = {
	  interpolate: /\{\{(.+?)\}\}/g
	};

	out.engine = underscore;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			fn(null, underscore.template(template)(options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(str, options){
		return underscore.template(str)(options);
	};

	return out;
}