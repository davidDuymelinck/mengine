var templayed = require('templayed');
var fs = require('fs');

module.exports = function templayedConfig(){
	var out = {};

	out.engine = templayed;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			fn(null, out.render(template, options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(template, options){
		return templayed(template)(options);
	};

	return out;
};