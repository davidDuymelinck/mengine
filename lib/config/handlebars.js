var handlebars = require('handlebars');
var fs = require('fs');

module.exports = function handlebarsConfig(){
	 var out = {};

	 out.engine = handlebars;

	 out.renderFile = function(path, options, fn){
	 	fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

	 		var render = handlebars.compile(template+'');

	 		fn(null, render(options));
	 	});
	 };

	 out.renderFileSync = function(path, options){
	 	try{
	 		var template = fs.readFileSync(path, 'utf-8');

	 		return handlebars.compile(template+'')(options);
	 	}catch(err){
	 		throw new Error('File ' + path + ' was unable to render: ' + err);
	 	}
	 };

	 out.renderString = function(str, options, fn){
	 	try{
	 		fn(null, handlebars.compile(str)(options));
	 	}catch(err){
	 		fn(err);
	 	}
	 };

	 out.renderStringSync = function(str, options){
	 	try{
	 		return handlebars.compile(str)(options);
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 return out;
}