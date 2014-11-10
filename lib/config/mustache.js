var mustache = require('mustache');
var fs = require('fs');

module.exports = function mustacheConfig(){
	var out = {};

	out.engine = mustache;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			mustache.parse(template);

			fn(null, mustache.render(template, options));
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			mustache.parse(template);

			return mustache.render(template, options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			mustache.parse(str);

			fn(null, mustache.render(str, options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			mustache.parse(str);

			return mustache.render(str, options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};