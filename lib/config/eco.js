var eco = require('eco');
var fs = require('fs');

module.exports = function ecoConfig(){
	 var out = {};

	 out.engine = eco;

	 out.renderFile = function(path, options, fn){
	 	var template = fs.readFileSync(path);

	 	try{
	 		fn(null, eco.render(template, options));
	 	}catch(err){
	 		fn(err);
	 	}
	 };

	 out.render = eco.render;

	 return out;
}