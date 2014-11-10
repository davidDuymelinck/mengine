var haml = require('hamljs');
var fs = require('fs');

module.exports = function hoganConfig(){
	 var out = {};

	 out.engine = haml;

	 out.renderFile = function(path, options, fn){
	 	haml.renderFile(path, {encoding: 'utf-8'}, {locals: options}, fn);
	 };

	 out.renderFileSync = function(path, options){
	 	try{
	 		var template = fs.readFileSync(path, 'utf-8');

	 		options.locals = options;
	 		options.filename = path;
	 		options.cache = true;

			return haml.render(template, options);
	 	}catch(err){
	 		throw new Error('File ' + path + ' was unable to render: ' + err);
	 	}
	 };

	 out.renderString = function(str, options, fn){
	 	try{
	 		fn(null, haml.render(str, {locals: options}));
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 out.renderStringSync = function(str, options){
	 	try{
	 		return haml.render(str, {locals: options});
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 return out;
}