var ractive = require('ractive');
var fs = require('fs');
var addPartials = require('../../lib/util').addPartials;

module.exports = function ractiveConfig(){
	var out = {};

	var renderer = ractive.extend({
		delimiters: [ '${', '}' ]
	});

	out.enigne = renderer;

	var pageRenderer = function(str, options){
		var page = renderer.extend({
			template: str
		});

		var pageConfig = { data: options };

		if(typeof options.partials !== 'undefined'){
			pageConfig.partials = addPartials(options.partials);
		}

		var pageRenderer = new page(pageConfig);

		return pageRenderer.toHTML();
	};

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

	 		fn(null, pageRenderer(template, options));
	 	});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return pageRenderer(template, options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, pageRenderer(str, options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return pageRenderer(str, options);
		}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	};

	return out;
};