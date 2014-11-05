var ect = require('ect');

module.exports = function ectConfig(){
	var out = {};
	var renderer = ect({ext: 'ect', open: '{{', close: '}}'});

	out.engine = renderer;

	out.renderFile = function(path, options, fn){
		try{
			fn(null, renderer.render(path, options));
		}catch(err){
			fn(err);
		}
	};

	return out;
}