var whiskers = require('whiskers');
var fs = require('fs');

module.exports = function whiskersConfig(){
	var out = {};

	out.engine = whiskers;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, whiskers.render(template, options));
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return whiskers.render(template, options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, whiskers.render(str, options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return whiskers.render(str, options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};