var liquor = require('liquor');
var fs = require('fs');

module.exports = function liquorConfig(){
	var out = {};

	out.engine = liquor;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, liquor.compile(template, options)(options));
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return liquor.compile(template, options)(options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, liquor.compile(str, options)(options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return liquor.compile(str, options)(options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};