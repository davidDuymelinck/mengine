var ect = require('ect');

module.exports = function ectConfig(){
	var out = {};
	var renderer = ect({ext: 'ect', open: '${', close: '}'});

	out.engine = renderer;

	out.renderFile = function(path, options, fn){
		try{
			fn(null, renderer.render(path, options));
		}catch(err){
			fn(err);
		}
	};

	out.renderFileSync = function(path, options){
		try{
			return renderer.render(path, options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	return out;
}