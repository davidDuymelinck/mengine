var qejs = require('qejs');
var fs = require('fs');

module.exports = function qejsConfig(){
	var out = {};

	qejs.open = '{{';
	qejs.close = '}}';

	out.engine = qejs;

	out.renderFile = function(path, options, fn){
		var template = fs.readFileSync(path, 'utf-8');

		qejs.render(template, options)
				.then(function(out){
					fn(null, out);
				})
				.catch(function(err){
					fn(err);
				});
	};

	return out;
};