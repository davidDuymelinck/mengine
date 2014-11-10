var walrus = require('walrus');
var fs = require('fs');

module.exports = function walrusConfig(){
	var out = {};

	out.engine = walrus;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, walrus.Walrus.Parser.parse(template).compile(options));
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return walrus.Walrus.Parser.parse(template).compile(options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, walrus.Walrus.Parser.parse(template).compile(options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return walrus.Walrus.Parser.parse(str).compile(options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};