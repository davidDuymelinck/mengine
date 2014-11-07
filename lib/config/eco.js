var eco = require('eco');
var fs = require('fs');

module.exports = function ecoConfig(){
	 var out = {};

	 out.engine = eco;

	 out.renderFile = function(path, options, fn){
	 	fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, eco.render(template, options));
		});
	 };

	 out.renderFileSync = function(path, options){
	 	try{
	 		var template = fs.readFileSync(path);

	 		return eco.render(template, options);
	 	}catch(err){
	 		throw new Error('File ' + path + ' was unable to render: ' + err);
	 	}
	 };

	 out.renderString = function(str, options, fn){
	 	try{
	 		fn(null, eco.render(str, options));
	 	}catch(err){
	 		fn(err);
	 	}
	 };

	 out.renderStringSync = function(str, options){
	 	try{
	 		return eco.render(str, options);
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 return out;
}