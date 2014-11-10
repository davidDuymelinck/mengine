var ractive = require('ractive');
var fs = require('fs');

module.exports = function ractiveConfig(){
	var out = {};

	out.enigne = ractive;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

	 		var renderer = new ractive({
				template: template,
				data: options
			});

	 		fn(null, renderer.toHTML());
	 	});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');
			var renderer = new ractive({
				template: template,
				data: options
			});

			return renderer.toHTML();
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			var renderer = new ractive({
				template: str,
				data: options
			});

			fn(null, renderer.toHTML());
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			var renderer = new ractive({
				template: str,
				data: options
			});

			return renderer.toHTML();
		}catch(err){
	 		throw new Error('The string was unable to render: ' + err);
	 	}
	};

	return out;
};