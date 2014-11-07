var ractive = require('ractive');
var fs = require('fs');

module.exports = function ractiveConfig(){
	var out = {};

	out.enigne = ractive;

	out.renderFile = function(path, options, fn){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			fn(null, out.render(template, options));
		}catch(err){
			fn(err);
		}
	};

	out.render = function(template, options){
		var renderer = new ractive({
			template: template,
			data: options
		});

		return renderer.toHTML();
	};

	return out;
};