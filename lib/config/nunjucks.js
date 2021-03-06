var nunjucks = require('nunjucks');
var fs = require('fs');

module.exports = function nunjucksConfig(){
	nunjucks.configure({ autoescape: true });

	out = {};

	out.engine = nunjucks;

	out.renderFile = nunjucks.render;

	out.renderFileSync = function(path, options){
			try{
				var template = fs.readFileSync(path, 'utf-8');

				return nunjucks.renderString(template, options);
			}catch(err){
				throw new Error('File ' + path + ' was unable to render: ' + err);
			}
	};

	out.renderString = function(str, options, fn){
			try{
				fn(null, nunjucks.renderString(str, options))
			}catch(err){
				fn(err);
			}
	};

	out.renderStringSync = function(str, options){
		try{
			return nunjucks.renderString(str, options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
}