var handlebars = require('handlebars');
var fs = require('fs');
var _ = require('lodash')

module.exports = function handlebarsConfig(){
	 var out = {};
	 var render = function(str, options){
	 	if(typeof options.partials !== 'undefined'){
	 		_.forIn(options.partials, function(file, name){
		 		var template = fs.readFileSync(file, 'utf-8');

		 		handlebars.registerPartial(name, template);
		 	});
	 	}

	 	return handlebars.compile(str+'')(options);
	 };

	 out.engine = handlebars;

	 out.renderFile = function(path, options, fn){
	 	fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

	 		fn(null, render(template, options));
	 	});
	 };

	 out.renderFileSync = function(path, options){
	 	try{
	 		var template = fs.readFileSync(path, 'utf-8');

	 		return render(template, options);
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