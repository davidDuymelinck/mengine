var nunjucks = require('nunjucks');

module.exports = function(mengine){
	nunjucks.configure({ autoescape: true });

	mengine.renderFile = nunjucks.render;

	mengine.render = nunjucks.renderString;

	return mengine;
};