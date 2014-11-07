var should = require('should');
var mengine = require('../');

describe('Mengine' , function(){
	var ejsConfig = '../test/config/ejs.js';

	describe('Init', function(){
		it('should return object', function(){
			mengine('jade').should.be.type('object');
		});

		it('should return object with lib config', function(){
			mengine('ejs').should.be.type('object');
		});

		it('should return object with custom config', function(){
			mengine('ejs', ejsConfig).should.be.type('object');
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
			var engine = mengine('ejs', ejsConfig);

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
			var engine = mengine('ejs', ejsConfig);

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
			var engine = mengine('ejs', ejsConfig);

			engine.should.have.property('render');

			engine.render.should.be.type('function');
		});
	});

	var data = { out: "Hello world" };

	describe('Render', function(){
		it('should output Hello world', function(done){
			var engine = mengine('jade');

			engine.render('= out', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.jade', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('should output Hello world with lib config', function(done){
			var engine = mengine('ejs');

			engine.render('{{= out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.ejs', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('should output Hello world with custom config', function(done){
			var engine = mengine('ejs', ejsConfig);

			engine.render('<%= out %>', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world_custom.ejs', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});
	});

	describe('Lib template configs', function(){
		it('atpl should output Hello world', function(done){
			var engine = mengine('atpl');

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('eco should output Hello world', function(done){
			var engine = mengine('eco');

			engine.render('<%= @out %>', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.eco', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('ect should output Hello world', function(done){
			var engine = mengine('ect');

			engine.renderFile('./test/templates/hello_world.ect', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('handlebars should output Hello world', function(done){
			var engine = mengine('handlebars');
			// Needed to add character because the engine didn't allow a variable only string
			engine.render('{{ out }} ', data).should.equal(data.out+' ');

			engine.renderFile('./test/templates/hello_world.handlebars', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out+'|');

				done();
			});
		});

		it('hogan should output Hello world', function(done){
			var engine = mengine('hogan');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('jazz should output Hello world', function(done){
			var engine = mengine('jazz');

			engine.renderFile('./test/templates/hello_world.jazz', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('just should output Hello world', function(done){
			var engine = mengine('just');

			engine.renderFile('./test/templates/hello_world.ejs', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('liquor should output Hello world', function(done){
			var engine = mengine('liquor');

			engine.render('#{out}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.liquor', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('lodash should output Hello world', function(done){
			var engine = mengine('lodash');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('mustache should output Hello world', function(done){
			var engine = mengine('mustache');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('nunjucks should output Hello world', function(done){
			var engine = mengine('nunjucks');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('qejs should output Hello world', function(done){
			var engine = mengine('qejs');

			engine.renderFile('./test/templates/hello_world.ejs', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('ractive should output Hello world', function(done){
			var engine = mengine('ractive');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('swig should output Hello world', function(done){
			var engine = mengine('swig');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('templayed should output Hello world', function(done){
			var engine = mengine('templayed');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('toffee should output Hello world', function(done){
			var engine = mengine('toffee');

			engine.render('#{out}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.liquor', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('underscore should output Hello world', function(done){
			var engine = mengine('underscore');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('walrus should output Hello world', function(done){
			var engine = mengine('walrus');

			engine.render('{{ out }}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('whiskers should output Hello world', function(done){
			var engine = mengine('whiskers');

			engine.render('{out}', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.dust', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});
	});
});