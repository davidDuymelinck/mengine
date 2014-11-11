var qejs = require('qejs');
var fs = require('fs');

module.exports = function qejsConfig(){
	var out = {};

	qejs.open = '${';
	qejs.close = '}';

	out.engine = qejs;

	out.renderFile = function(path, options, fn){
		qejs.renderFile(path, options)
					.then(function(out){
						fn(null, out);
					})
					.catch(function(err){
						fn(err);
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