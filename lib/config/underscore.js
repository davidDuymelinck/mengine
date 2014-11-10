var underscore = require('underscore');
var fs = require('fs');

module.exports = function lodashConfig(){
	var out = {};

	underscore.templateSettings = {
	  interpolate: /\$\{(.+?)\}/g
	};

	out.engine = underscore;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, underscore.template(template)(options));
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return underscore.template(template)(options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, underscore.template(str)(options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return underscore.template(str)(options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
}