var swig = require('swig');

module.exports = function swigConfig(){
	var out = {};

	out.engine = swig;

	out.renderFile = swig.renderFile;

	out.renderFileSync = function(path, options){
		try{
			return swig.compileFile(path)(options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, swig.render(str, { locals : options }));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return swig.render(str, { locals : options });
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};