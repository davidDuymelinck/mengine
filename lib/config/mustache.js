var mustache = require('mustache');
var fs = require('fs');

module.exports = function mustacheConfig(){
	var out = {};

	out.engine = mustache;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			mustache.parse(template);

			fn(null, mustache.render(template, options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(template, options){
		mustache.parse(template);

		return mustache.render(template, options);
	};

	return out;
};