var just = require('just');

module.exports = function justConfig(){
	var out = {};
	var renderer = new just({open: '{{', close: '}}', useCache: true});

	out.engine = renderer;

	out.renderFile = function(path, options, fn){
		renderer.render(path, options, fn);
	};

	return out;
}