var ejs = require('ejs');

module.exports = function ejsConfig(){
	ejs.open = '<%';
	ejs.close = '%>'

	var out = {};

	out.engine = ejs;

	out.renderFile = ejs.renderFile;

	out.render = ejs.render;

	return out;
};