var hogan = require('hogan');
var fs = require('fs');

module.exports = function hoganConfig(){
	 var out = {};

	 out.engine = hogan;

	 out.renderFile = function(path, options, fn){
	 	try{
	 		var template = fs.readFileSync(path);
	 		var renderer = hogan.compile(template)

	 		fn(null, renderer.render(options));
	 	}catch(err){
	 		fn(err);
	 	}
	 };

	 out.render = function(template, options){
	 	var renderer = hogan.compile(template);

	 	return renderer.render(options);
	 };

	 return out;
}