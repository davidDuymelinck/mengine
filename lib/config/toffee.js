var toffee = require('toffee');

module.exports = function toffeeConfig(){
	var out = {};

	out.engine = toffee;

	out.renderFile = toffee.render;

	out.render = function(template, options){
		htmlOut = toffee.compileStr(template)(options);

		return htmlOut[1];
	};

	return out;
};