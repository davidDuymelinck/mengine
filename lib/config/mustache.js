var mustache = require('mustache');
var fs = require('fs');
var addPartials = require('../../lib/util').addPartials;

module.exports = function mustacheConfig(){
	var out = {};
	var render = function(str, options){
		str = '{{=${ }=}}' + str;

		mustache.parse(str);

		if(typeof options.partials !== 'undefined'){
			return mustache.render(str, options, addPartials(options.partials));
		}

		return mustache.render(str, options);
	};

	out.engine = mustache;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			fn(null, render(template, options));
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');

			return render(template, options);
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			fn(null, render(str, options));
		}catch(err){
			fn(err);
		}
	};

	out.renderStringSync = function(str, options){
		try{
			return render(str, options);
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};