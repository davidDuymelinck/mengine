var nunjucks = require('nunjucks');

module.exports = function nunjucksConfig(){
	nunjucks.configure({ autoescape: true });

	out = {};

	out.engine = nunjucks;

	out.renderFile = nunjucks.render;

	out.render = nunjucks.renderString;

	return out;
}