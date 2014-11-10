var hamlCoffee = require('haml-coffee');
var fs = require('fs');

module.exports = function hoganConfig(){
	 var out = {};

	 out.engine = hamlCoffee;

	 out.renderFile = function(path, options, fn){
	 	fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, hamlCoffee.render(template, options));
		});
	 };

	 out.renderFileSync = function(path, options){
	 	try{
	 		var template = fs.readFileSync(path, 'utf-8');

			return hamlCoffee.render(template, options);
	 	}catch(err){
	 		throw new Error('File ' + path + ' was unable to render: ' + err);
	 	}
	 };

	 out.renderString = function(str, options, fn){
	 	try{
	 		fn(null, hamlCoffee.render(str, options));
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 out.renderStringSync = function(str, options){
	 	try{
	 		return hamlCoffee.render(str, options);
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 return out;
}