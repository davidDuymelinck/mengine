var should = require('should');
var mengine = require('../');

describe('Mengine' , function(){
	var nunjucksConfig = '../test/config/nunjucks.js';

	describe('Init', function(){
		it('should return object', function(){
			mengine('jade').should.be.type('object');
		});

		it('should return object with lib config', function(){
			mengine('ejs').should.be.type('object');
		});

		it('should return object with custom config', function(){
			mengine('nunjucks', nunjucksConfig).should.be.type('object');
		});

		it('should have an engine object', function(){
			var engine = mengine('jade');

			engine.should.have.property('engine');

			engine.engine.should.be.type('object');
		});

		it('should have an engine object with lib config', function(){
			var engine = mengine('ejs');

			engine.should.have.property('engine');

			engine.engine.should.be.type('object');
		});

		it('should have an engine object with custom config', function(){
			var engine = mengine('nunjucks', nunjucksConfig);

			engine.should.have.property('engine');

			engine.engine.should.be.type('object');
		});

		it('should have an renderFile method', function(){
			var engine = mengine('jade');

			engine.should.have.property('renderFile');

			engine.renderFile.should.be.type('function');
		});

		it('should have an renderFile method with lib config', function(){
			var engine = mengine('ejs');

			engine.should.have.property('renderFile');

			engine.renderFile.should.be.type('function');
		});

		it('should have an renderFile method with custom config', function(){
			var engine = mengine('nunjucks', nunjucksConfig);

			engine.should.have.property('renderFile');

			engine.renderFile.should.be.type('function');
		});

		it('should have a render method', function(){
			var engine = mengine('jade');

			engine.should.have.property('render');

			engine.render.should.be.type('function');
		});

		it('should have a render method with lib config', function(){
			var engine = mengine('ejs');

			engine.should.have.property('render');

			engine.render.should.be.type('function');
		});

		it('should have a render method with custom config', function(){
			var engine = mengine('nunjucks', nunjucksConfig);

			engine.should.have.property('render');

			engine.render.should.be.type('function');
		});
	});

	describe('Render', function(){
		var data = { out: "Hello world" };

		it('should output Hello world', function(done){
			var engine = mengine('ejs');

			engine.render('{{= out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.ejs', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('should output Hello world with custom config', function(done){
			var engine = mengine('nunjucks', nunjucksConfig);

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.nunjucks', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});
	});
});