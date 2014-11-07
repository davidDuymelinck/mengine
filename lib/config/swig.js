var swig = require('swig');

module.exports = function swigConfig(){
	var out = {};

	out.engine = swig;

	out.renderFile = function(path, options, fn){
		try{
			fn(null, swig.compileFile(path)(options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(template, options){
		return swig.render(template, { locals : options });
	};

	return out;
};