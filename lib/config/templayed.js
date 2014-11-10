var templayed = require('templayed');
var fs = require('fs');

module.exports = function templayedConfig(){
	var out = {};

	out.engine = templayed;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, templayed(template)(options));
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return templayed(template)(options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, templayed(str)(options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return templayed(str)(options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};