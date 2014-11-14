var jade = require('jade');
var fs = require('fs');

module.exports = function hoganConfig(){
	 var out = {};

	 out.engine = jade;

	 out.renderFile = function(path, options, fn){
	 	fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, jade.render(template, options));
		});
	 };

	 out.renderFileSync = function(path, options){
	 	try{
	 		return jade.renderFile(path, options);
	 	}catch(err){
	 		throw new Error('File ' + path + ' was unable to render: ' + err);
	 	}
	 };

	 out.renderString = function(str, options, fn){
	 	try{
	 		fn(null, jade.render(str, options));
	 	}catch(err){
	 		fn(err);
	 	}
	 };

	 out.renderStringSync = function(str, options){
	 	try{
	 		return jade.render(str, options);
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 return out;
}