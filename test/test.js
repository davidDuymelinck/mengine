var should = require('should');
var mengine = require('../');
var Plan = require('../lib/util').Plan;
var fs = require('fs');

describe('Mengine' , function(){
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

	describe('Lib template configs', function(){
		var data = { out: "Hello world" };
		var fullApiMustache = function(engineName, done){
			var engine = mengine(engineName);
			var plan = new Plan(2, done);

			engine.renderStringSync('{{ out }}', data).should.equal(data.out);

			engine.renderString('{{ out }}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.mustache', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.mustache', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		};
		var fullApiES6 = function(engineName, done){
			var engine = mengine(engineName);
			var plan = new Plan(2, done);

			engine.renderStringSync('${out}', data).should.equal(data.out);

			engine.renderString('${out}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.es6', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.es6', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		};

		it('atpl should output Hello world', function(done){
			var engine = mengine('atpl');

			engine.renderFileSync(__dirname + '/templates/hello_world.mustache', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.mustache', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('dust should output Hello world', function(done){
			var engine = mengine('dust');
			var plan = new Plan(2, done);
			// required for renderString
			data.templateName = 'test';

			engine.renderString('{out}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFile(__dirname + '/templates/hello_world.dust', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
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

			engine.renderFileSync(__dirname + '/templates/hello_world.eco', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.eco', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('ect should output Hello world', function(done){
			var engine = mengine('ect');

			engine.renderFileSync(__dirname + '/templates/hello_world.ect', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.ect', data, function(err, html){
				if(err){ return done(err); }

				html.should.equal(data.out);

				done();
			});
		});

		it('ejs should output Hello world', function(done){
			var engine = mengine('ejs');
			var plan = new Plan(2, done);

			engine.renderStringSync('${= out }', data).should.equal(data.out);

			engine.renderString('${= out }', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.ejs', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.ejs', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('haml should output Hello world', function(done){
			var engine = mengine('haml');
			var plan = new Plan(2, done);

			engine.renderStringSync('= out', data).should.equal(data.out);

			engine.renderString('= out', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.haml', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.haml', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('haml-coffee should output Hello world', function(done){
			var engine = mengine('haml-coffee');
			var plan = new Plan(2, done);

			engine.renderStringSync('= @out', data).should.equal(data.out);

			engine.renderString('= @out', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.hamlcoffee', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.hamlcoffee', data, function(err, html){
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

			engine.renderFileSync(__dirname + '/templates/hello_world.handlebars', data).should.equal(data.out+'|');

			engine.renderFile(__dirname + '/templates/hello_world.handlebars', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out+'|');

				plan.ok(true);
			});
		});

		it('hogan should output Hello world', function(done){
			fullApiES6('hogan', done);
		});

		it('jade should output Hello world', function(done){
			var engine = mengine('jade');
			var plan = new Plan(2, done);

			engine.renderStringSync('= out', data).should.equal(data.out);

			engine.renderString('= out', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.haml', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.haml', data, function(err, html){
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

			engine.renderFile(__dirname + '/templates/hello_world.jazz', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('just should output Hello world', function(done){
			var engine = mengine('just');
			var plan = new Plan(2, done);
			// renderString is a bad name, it should be renderObject, but doesn't change for api consistency
			engine.renderString({ content: '${= out }'}, data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFile(__dirname + '/templates/hello_world.ejs', data, function(err, html){
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

			engine.renderFileSync(__dirname + '/templates/hello_world.liquor', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.liquor', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('lodash should output Hello world', function(done){
			fullApiES6('lodash', done);
		});

		it('mustache should output Hello world', function(done){
			fullApiES6('mustache', done);
		});

		it('nunjucks should output Hello world', function(done){
			fullApiMustache('nunjucks', done);
		});

		it('qejs should output Hello world', function(done){
			var engine = mengine('qejs');
			var plan = new Plan(2, done);

			engine.renderString('${= out }', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFile(__dirname + '/templates/hello_world.ejs', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('ractive should output Hello world', function(done){
			fullApiES6('ractive', done);
		});

		it('swig should output Hello world', function(done){
			fullApiMustache('swig', done);
		});

		it('templayed should output Hello world', function(done){
			fullApiMustache('templayed', done);
		});

		it('toffee should output Hello world', function(done){
			var engine = mengine('toffee');
			var plan = new Plan(2, done);

			engine.renderStringSync('#{out}', data).should.equal(data.out);

			engine.renderString('#{out}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.liquor', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.liquor', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

		it('underscore should output Hello world', function(done){
			fullApiES6('underscore', done);
		});

		it('walrus should output Hello world', function(done){
			fullApiMustache('walrus', done);
		});

		it('whiskers should output Hello world', function(done){
			var engine = mengine('whiskers');
			var plan = new Plan(2, done);

			engine.renderStringSync('{out}', data).should.equal(data.out);

			engine.renderString('{out}', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});

			engine.renderFileSync(__dirname + '/templates/hello_world.dust', data).should.equal(data.out);

			engine.renderFile(__dirname + '/templates/hello_world.dust', data, function(err, html){
				if(err){ return plan.ok(true); }

				html.should.equal(data.out);

				plan.ok(true);
			});
		});

	});

	describe('Partials/inheritance', function(){
		it('atpl should have extended layout and included include template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('atpl');

			engine.renderFileSync(__dirname + '/templates/partials/atpl/index.mustache', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');
		});

		it('dust should have extended layout and included include template', function(done){
			var data = { title: 'Hello world'};
			var engine = mengine('dust');

			data.partials = {
				layout: __dirname + '/templates/partials/dust/layout.dust',
				include: __dirname + '/templates/partials/dust/include.dust'
			};

			engine.renderFile(__dirname + '/templates/partials/dust/index.dust', data, function(err, html){
				if(err){ return done(err); }

				html.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');

				done();
			});

		});

		it('ect should have extended layout and included include template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('ect');

			engine.engine.configure({root: __dirname + '/templates/partials/ect'});

			engine.renderFileSync('index.ect', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');
		});

		it('ejs should have included head and footer template', function(){
			var data = { title: 'Hello world', filename: __dirname + '/templates/partials/ejs/index.ejs'};
			var engine = mengine('ejs');

			engine.renderFileSync(__dirname + '/templates/partials/ejs/index.ejs', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Footer');
		});

		it('haml-coffee should have included head and footer template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('haml-coffee');

			engine.renderFileSync(__dirname + '/templates/partials/haml-coffee/index.hamlcoffee', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Footer');
		});

		it('handlebars should have included head and footer template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('handlebars');

			data.partials = {
				head: __dirname + '/templates/partials/handlebars/head.handlebars',
				footer: __dirname + '/templates/partials/handlebars/footer.handlebars'
			};

			engine.renderFileSync(__dirname + '/templates/partials/handlebars/index.handlebars', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Footer');
		});

		it('hogan should have extended layout and included include template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('hogan');

			data.partials = {
				include: __dirname + '/templates/partials/hogan/include.es6',
				layout: __dirname + '/templates/partials/hogan/layout.es6'
			};

			engine.renderFileSync(__dirname + '/templates/partials/hogan/index.es6', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');
		});

		it('jade should have extended layout and included include template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('jade');

			engine.renderFileSync(__dirname + '/templates/partials/jade/index.haml', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');
		});

		it('just should have extended layout and included include template', function(done){
			var data = { title: 'Hello world'};
			var engine = mengine('just');

			engine.renderFile(__dirname + '/templates/partials/just/index.es6', data, function(err, html){
				if(err){ return done(err); }

				html.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');

				done();
			});

		});

		it('mustache should have included head and footer template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('mustache');

			data.partials = {
				head: __dirname + '/templates/partials/mustache/head.es6',
				footer: __dirname + '/templates/partials/mustache/footer.es6'
			};

			engine.renderFileSync(__dirname + '/templates/partials/mustache/index.es6', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Footer');
		});

		it('nunjucks should have extended layout and included include template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('nunjucks');

			engine.renderFileSync(__dirname + '/templates/partials/nunjucks/index.mustache', data)
					.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');
		});

		it('qejs should have extended layout and included include template', function(done){
			var data = { title: 'Hello world'};
			var engine = mengine('qejs');

			engine.renderFile(__dirname + '/templates/partials/qejs/index.es6', data, function(err, html){
				if(err){ return done(err); }

				html.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');

				done();
			});
		});

		it('ractive should have included head and footer template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('ractive');

			data.partials = {
				head: __dirname + '/templates/partials/mustache/head.es6',
				footer: __dirname + '/templates/partials/mustache/footer.es6'
			};

			engine.renderFileSync(__dirname + '/templates/partials/mustache/index.es6', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Footer');
		});

		it('swig should have extended layout and included include template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('swig');

			engine.renderFileSync(__dirname + '/templates/partials/swig/index.mustache', data)
					.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');
		});

		it('toffee should have extended layout and included include template', function(done){
			var data = { title: 'Hello world'};
			var engine = mengine('toffee');

			engine.renderFileSync(__dirname + '/templates/partials/toffee/index.liquor', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');

			engine.renderFile(__dirname + '/templates/partials/toffee/index.liquor', data, function(err, html){
				if(err){ return done(err); }

				html.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Included');

				done();
			});
		});

		it('whiskers should have included head and footer template', function(){
			var data = { title: 'Hello world'};
			var engine = mengine('whiskers');

			data.partials = {
				head: __dirname + '/templates/partials/whiskers/head.dust',
				footer: __dirname + '/templates/partials/whiskers/footer.dust'
			};

			engine.renderFileSync(__dirname + '/templates/partials/whiskers/index.dust', data)
						.should.containEql('html')
						.and.containEql(data.title)
						.and.containEql('Footer');
		});

	});
});