var qejs = require('qejs');
var fs = require('fs');

module.exports = function qejsConfig(){
	var out = {};

	qejs.open = '${';
	qejs.close = '}';

	out.engine = qejs;

	out.renderFile = function(path, options, fn){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, template){
			if(err){ return fn(err); }

			qejs.render(template, options)
					.then(function(out){
						fn(null, out);
					})
					.catch(function(err){
						fn(err);
					});
		});
	};

	out.renderString = function(str, options, fn){
		qejs.render(str, options)
				.then(function(out){
					fn(null, out);
				})
				.catch(function(err){
					fn(err);
				});
	};

	return out;
};