var jazz = require('jazz');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function JazzRender(){
	EventEmitter.call(this);

	var _data, _fn;

	this.string = function(str, data){
		_data = data;

		this.emit('template', str);
	};

	this.file = function(path, data, fn){
		_data = data;
		_fn = fn;

		this.emit('file', path);
	}

	var getFile = function(path){
		fs.readFile(path, {encoding: 'utf-8'}, function(err, data){
			if(err){
				return _fn(err);
			}

			this.emit('template', data);
		}.bind(this));
	}

	var render = function(str){
		var renderer = jazz.compile(str);

		renderer.eval(_data, function(out){
			if(typeof _fn === 'function'){
				_fn(null, out);
			}else{
				this.emit('rendered', out)
			}
		}.bind(this));
	}

	var output = function(out){
		return out;
	}

	this.on('file', getFile);
	this.on('template', render);
	this.on('rendered', output);
};

util.inherits(JazzRender, EventEmitter);

module.exports = function jazzConfig(){
	 var out = {};

	 out.engine = jazz;

	 out.renderFile = function(path, options, fn){
	 	var jazzRender = new JazzRender();

	 	jazzRender.file(path, options, fn);
	 };

	 return out;
}