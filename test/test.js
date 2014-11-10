var should = require('should');
var mengine = require('../');
var Plan = require('../lib/util').Plan;

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

			engine.renderFileSync('./test/templates/hello_world.mustache', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('eco should output Hello world', function(done){
			var engine = mengine('eco');
			var plan = new Plan(2, done);

			engine.renderStringSync('<%= @out %>', data).should.equal(data.out);

			engine.renderString('<%= @out %>', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.eco', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.eco', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('ect should output Hello world', function(done){
			var engine = mengine('ect');

			engine.renderFileSync('./test/templates/hello_world.ect', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.ect', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('ejs should output Hello world', function(done){
			var engine = mengine('ejs');
			var plan = new Plan(2, done);

			engine.renderStringSync('{{= out }}', data).should.equal(data.out);

			engine.renderString('{{= out }}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.ejs', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.ejs', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('handlebars should output Hello world', function(done){
			var engine = mengine('handlebars');
			var plan = new Plan(2, done);
			// Needed to add character because the engine didn't allow a variable only string
			engine.renderStringSync('{{ out }} ', data).should.equal(data.out+' ');

			engine.renderString('{{ out }} ', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out+' ');

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.handlebars', data).should.equal(data.out+'|');

			engine.renderFile('./test/templates/hello_world.handlebars', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out+'|');

				plan.ok(true);
			});
		});

		it('hogan should output Hello world', function(done){
			var engine = mengine('hogan');
			var plan = new Plan(2, done);

			engine.renderStringSync('{{ out }}', data).should.equal(data.out);

			engine.renderString('{{ out }}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.mustache', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('jazz should output Hello world', function(done){
			var engine = mengine('jazz');
			var plan = new Plan(2, done);

			engine.renderString('{ out }', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFile('./test/templates/hello_world.jazz', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('just should output Hello world', function(done){
			var engine = mengine('just');
			var plan = new Plan(2, done);
			// renderString is a bad name, it should be renderObject, but doesn't change for api consistency
			engine.renderString({ content: '{{= out }}'}, data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFile('./test/templates/hello_world.ejs', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('liquor should output Hello world', function(done){
			var engine = mengine('liquor');
			var plan = new Plan(2, done);

			engine.renderStringSync('#{out}', data).should.equal(data.out);

			engine.renderString('#{out}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.liquor', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.liquor', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('lodash should output Hello world', function(done){
			var engine = mengine('lodash');
			var plan = new Plan(2, done);

			engine.renderStringSync('{{ out }}', data).should.equal(data.out);

			engine.renderString('{{ out }}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.mustache', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('mustache should output Hello world', function(done){
			var engine = mengine('mustache');
			var plan = new Plan(2, done);

			engine.renderStringSync('{{ out }}', data).should.equal(data.out);

			engine.renderString('{{ out }}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.mustache', data).should.equal(data.out);

			engine.renderFile('./test/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('nunjucks should output Hello world', function(done){
			var engine = mengine('nunjucks');
			var plan = new Plan(2, done);

			engine.renderStringSync('{{ out }}', data).should.equal(data.out);

			engine.renderString('{{ out }}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync('./test/templates/hello_world.mustache', data).should.equal(data.out);

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