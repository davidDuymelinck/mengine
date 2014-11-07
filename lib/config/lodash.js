var lodash = require('lodash');
var fs = require('fs');

module.exports = function lodashConfig(){
	var out = {};

	lodash.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

	out.engine = lodash;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			fn(null, lodash.template(template, options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(str, options){
		return lodash.template(str, options);
	};

	return out;
}