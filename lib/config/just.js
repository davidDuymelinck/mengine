var just = require('just');

module.exports = function justConfig(){
	var out = {};
	var renderer = new just({open: '{{', close: '}}', useCache: true});

	out.engine = renderer;

	out.renderFile = function(path, options, fn){
		renderer.render(path, options, fn);
	};

	out.renderString = function(obj, options, fn){
		renderer.configure({root : obj});

		var content = typeof options.justContent !== 'undefined' ? options.justContent : 'content';

		renderer.render(content, options, fn);
	}

	return out;
}