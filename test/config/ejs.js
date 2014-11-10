var ejs = require('ejs');

module.exports = function ejsConfig(){
	ejs.open = '<%';
	ejs.close = '%>'

	var out = {};

	out.engine = ejs;

	out.renderFile = ejs.renderFile;

	out.renderString = function(str, options, fn){
		try{
			fn(null, ejs.render(str, options));
		}catch(er){
			fn(err);
		}
	};

	return out;
};