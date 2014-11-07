var whiskers = require('whiskers');
var fs = require('fs');

module.exports = function whiskersConfig(){
	var out = {};

	out.engine = whiskers;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			fn(null, whiskers.render(template, options));
		}catch(err){
			fn(err);
		}
	};

	out.render = whiskers.render;

	return out;
};