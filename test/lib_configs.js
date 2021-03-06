var should = require('should');
var mengine = require('../');
var Plan = require('../lib/util').Plan;

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

describe('Lib template configs', function(){

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
		fullApiMustache('handlebars', done);
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