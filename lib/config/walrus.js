var walrus = require('walrus');
var fs = require('fs');

module.exports = function walrusConfig(){
	var out = {};

	out.engine = walrus;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			fn(null, out.render(template, options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(str, options){
		var template = walrus.Walrus.Parser.parse(str);

		return template.compile(options);
	};

	return out;
};