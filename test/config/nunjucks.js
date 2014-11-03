var nunjucks = require('nunjucks');

module.exports = function nunjucksConfig(){
	nunjucks.configure({ autoescape: true });

	var out = {};

	out.engine = nunjucks;

	out.renderFile = nunjucks.render;

	out.render = nunjucks.renderString;

	return out;
};