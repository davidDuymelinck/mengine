var should = require('should');
var mengine = require('../');

var ejsConfig = __dirname + '/config/ejs.js';

describe('Init', function(){

	it('should return object with lib config', function(){
		mengine('ejs').should.be.type('object');
	});

	it('should return object with custom config', function(){
		mengine('ejs', ejsConfig).should.be.type('object');
	});

	it('should have an engine object with lib config', function(){
		var engine = mengine('ejs');

		engine.should.have.property('engine');

		engine.engine.should.be.type('object');
	});

	it('should have an engine object with custom config', function(){
		var engine = mengine('ejs', ejsConfig);

		engine.should.have.property('engine');

		engine.engine.should.be.type('object');
	});

});