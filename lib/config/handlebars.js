var handlebars = require('handlebars');
var fs = require('fs');

module.exports = function handlebarsConfig(){
	 var out = {};

	 out.engine = handlebars;

	 out.renderFile = function(path, options, fn){
	 	try{
	 		var template = fs.readFileSync(path);
	 		var render = handlebars.compile(template+'')

	 		fn(null, render(options));
	 	}catch(err){
	 		fn(err);
	 	}
	 };

	 out.render = function(template, options){
	 	var render = handlebars.compile(template);

	 	return render(options);
	 };

	 return out;
}