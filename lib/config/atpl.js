var atpl = require('atpl');

module.exports = function atplConfig(){
	var out = {};

	out.engine = atpl;

	out.renderFile = function(path, options, fn){
		var parts = path.split('/'),
			file = parts.pop(),
			dir = parts.join('/');

		fn(null, atpl.renderFileSync(dir, file, options));
	};

	return out;
};