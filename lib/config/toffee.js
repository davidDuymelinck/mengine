var toffee = require('toffee');
var fs = require('fs');

module.exports = function toffeeConfig(){
	var out = {};

	out.engine = toffee;

	out.renderFile = function(path, options, fn){
		toffee.render(path, options, function(err, html){
			if(err){
				fn(err);
				return;
			}

			if(html instanceof Error){
				fn(html);
				return;
			}

			fn(null, html);
		});
	};

	out.renderFileSync = function(path, options){
		try{
			var renderer = new toffee.engine();
			var htmlOut = renderer.runSync(path, options);

			if(htmlOut[0]){
				throw new Error('File ' + path + ' was unable to render: ' + htmlOut[0]);
				return;
			}

			return htmlOut[1];
		}catch(err){
			throw new Error('File ' + path + ' was unable to render: ' + err);
		}
	};

	out.renderString = function(str, options, fn){
		try{
			var htmlOut = toffee.compileStr(str)(options);

			if(htmlOut[0]){
				fn(htmlOut[0]);
				return;
			}

			fn(null, htmlOut[1]);
		}catch(err){
			fn(err);
		}
	}

	out.renderStringSync = function(str, options){
		try{
			var htmlOut = toffee.compileStr(str)(options);

			if(htmlOut[0]){
				throw new Error('The string was unable to render: ' + htmlOut[0]);
				return;
			}

			return htmlOut[1];
		}catch(err){
			throw new Error('The string was unable to render: ' + err);
		}
	};

	return out;
};