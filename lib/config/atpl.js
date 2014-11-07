var atpl = require('atpl');

module.exports = function atplConfig(){
	var out = {};

	out.engine = atpl;

	out.renderFile = function(path, options, fn){
		try{
			var parts = path.split('/'),
				file = parts.pop(),
				dir = parts.join('/');

			fn(null, atpl.renderFileSync(dir, file, options));
		}catch(err){
			fn(err);
		}
	};

	out.renderFileSync = function(path, options){
		try{
			var parts = path.split('/'),
				file = parts.pop(),
				dir = parts.join('/');

			return atpl.renderFileSync(dir, file, options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	}

	return out;
};