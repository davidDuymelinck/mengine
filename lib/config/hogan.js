var hogan = require('hogan');
var fs = require('fs');

module.exports = function hoganConfig(){
	 var out = {};

	 out.engine = hogan;

	 out.renderFile = function(path, options, fn){
	 	fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, hogan.compile(template).render(options));
		});
	 };

	 out.renderFileSync = function(path, options){
	 	try{
	 		var template = fs.readFileSync(path);

	 		return hogan.compile(template).render(options);
	 	}catch(err){
	 		throw new Error('File ' + path + ' was unable to render: ' + err);
	 	}
	 };

	 out.renderString = function(str, options, fn){
	 	try{
	 		fn(null, hogan.compile(str).render(options));
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 out.renderStringSync = function(str, options){
	 	try{
	 		return hogan.compile(str).render(options);
	 	}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	 };

	 return out;
}