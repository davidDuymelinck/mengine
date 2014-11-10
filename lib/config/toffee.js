var toffee = require('toffee');
var fs = require('fs');

module.exports = function toffeeConfig(){
	var out = {};

	out.engine = toffee;

	out.renderFile = toffee.render;

	out.renderFileSync = function(path, options){
		try{
			var template = fs.readFileSync(path, 'utf-8');
			var htmlOut = toffee.compileStr(template)(options);

			return htmlOut[1];
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			var htmlOut = toffee.compileStr(str)(options);

			fn(null, htmlOut[1]);
		}catch(err){
			fn(err);
		}
	}

	out.renderStringSync = function(str, options){
		try{
			var htmlOut = toffee.compileStr(str)(options);

			return htmlOut[1];
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};