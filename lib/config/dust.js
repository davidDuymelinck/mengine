var dust = require('dustjs-linkedin');
var fs = require('fs');
var _ = require('lodash');

module.exports = function(){
	var out = {};
	var addPartials = function(partials){
		_.forIn(partials, function(file, name){
	      var template = fs.readFileSync(file, 'utf-8');

	      var compiled = dust.compile(template, name);

	      dust.loadSource(compiled);
	    });
	};

	out.engine = dust;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			var compiled = dust.compile(template, path);

			dust.loadSource(compiled);

			if(typeof options.partials !== 'undefined'){
				addPartials(options.partials);
			}

			dust.render(path, options, fn);
		});
	};

	out.renderString = function(str, options, fn){
		var compiled = dust.compile(str, options.templateName);

		dust.loadSource(compiled);

		dust.render(options.templateName, options, fn);
	};

	return out;
};