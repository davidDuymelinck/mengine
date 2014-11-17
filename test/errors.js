var should = require('should');
var mengine = require('../');
var util = require('../lib/util');
var Plan = util.Plan;
var MyConsole = util.MyConsole;
console.log(MyConsole);
var noStringsES6 = function(engine, plan){
	(function(){
		engine.renderStringSync('${#missingTag}', {});
	}).should.throw();

	engine.renderString('${#missingTag}', {}, function(err, html){
		err.should.be.an.Error;

		plan.ok(true);
	});
};

var noStringsMustache = function(engine, plan){
	(function(){
		engine.renderStringSync('{{#missingTag}}', {});
	}).should.throw();

	engine.renderString('{{#missingTag}}', {}, function(err, html){
		err.should.be.an.Error;

		plan.ok(true);
	});
};

var noFiles = function(engine, plan){
	(function(){
		engine.renderFileSync(__dirname + '/templates/nothere', {});
	}).should.throw();

	engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
		err.should.be.an.Error;

		plan.ok(true);
	});
};

describe('Errors', function(){

	it('atpl', function(done){
		var engine = mengine('atpl');
		var plan = new Plan(1, done);

		noFiles(engine, plan);
	});

	it('dust', function(done){
		var engine = mengine('dust');
		var plan = new Plan(4, done);

		// no templateName in the second param
		engine.renderString('{out}', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		engine.renderString('{ badSyntax }', {templateName: 'test'}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
		// no partials
		engine.renderFile(__dirname + '/templates/partials/dust/index.dust', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
	});

	it('eco', function(done){
		var engine = mengine('eco');
		var plan = new Plan(2, done);

		(function(){
			engine.renderStringSync('<%= badSyntax %>', {});
		}).should.throw();

		engine.renderString('<%= badSyntax %>', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		(function(){
			engine.renderFileSync(__dirname + '/templates/nothere', {}).should.equal(data.out);
		}).should.throw();

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
	});

	it('ect', function(done){
		var engine = mengine('ect');
		var plan = new Plan(1, done);

		noFiles(engine, plan);
		// root not configured
		(function(){
			engine.renderFileSync('index.ect', {});
		}).should.throw();
	});

	it('ejs', function(done){
		var engine = mengine('ejs');
		var plan = new Plan(2, done);

		(function(){
			engine.renderStringSync('${= out() }', {});
		}).should.throw();

		engine.renderString('${= out() }', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		noFiles(engine, plan);
		// options don't have filename property
		(function(){
			engine.renderFileSync(__dirname + '/templates/partials/ejs/index.ejs', {});
		}).should.throw();
	});

	it('haml', function(done){
		var engine = mengine('haml');
		var plan = new Plan(2, done);

		(function(){
			engine.renderStringSync(':doesNotExist', {});
		}).should.throw();

		engine.renderString(':doesNotExist', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		noFiles(engine, plan);
	});

	it('haml-coffee should output Hello world', function(done){
		var engine = mengine('haml-coffee');
		var plan = new Plan(2, done);

		(function(){
			engine.renderStringSync('= badSyntax', {});
		}).should.throw();

		engine.renderString('= badSyntax', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		noFiles(engine, plan);
	});

	it('handlebars', function(done){
		var engine = mengine('handlebars');
		var plan = new Plan(2, done);

		noStringsMustache(engine, plan);

		noFiles(engine, plan);

		// no partials
		(function(){
			engine.renderFileSync(__dirname + '/templates/partials/handlebars/index.handlebars', {});
		}).should.throw();
	});

	it('hogan', function(done){
		var engine = mengine('hogan');
		var plan = new Plan(3, done);

		noStringsES6(engine, plan);

		noFiles(engine, plan);
		// no partials
		// renderFileSync renders an empty string if the parent template isn't found.
		engine.renderFile(__dirname + '/templates/partials/hogan/index.es6', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
	});

	it('jade', function(done){
		var engine = mengine('jade');
		var plan = new Plan(2, done);

		(function(){
			engine.renderStringSync('= badSyntax(', {});
		}).should.throw();

		engine.renderString('= badSyntax(', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		noFiles(engine, plan);
	});

	it('jazz', function(done){
		var engine = mengine('jazz');
		var plan = new Plan(2, done);

		engine.renderString('{ badSyntax( }', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
	});

	it('just', function(done){
		var engine = mengine('just');
		var plan = new Plan(2, done);
		// renderString is a bad name, it should be renderObject, but doesn't change for api consistency
		engine.renderString({ content: '${= }'}, {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
	});

	it('liquor', function(done){
		var engine = mengine('liquor');
		var plan = new Plan(2, done);

		(function(){
			engine.renderStringSync('#{out(}', {});
		}).should.throw();

		engine.renderString('#{out(}', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		noFiles(engine, plan);
	});

	it('lodash', function(done){
		var engine = mengine('lodash');
		var plan = new Plan(2, done);

		noStringsES6(engine, plan);

		noFiles(engine, plan);
	});

	it('mustache', function(done){
		var engine = mengine('mustache');
		var plan = new Plan(2, done);

		noStringsES6(engine, plan);

		noFiles(engine, plan);
	});

	it('nunjucks', function(done){
		var engine = mengine('nunjucks');
		var plan = new Plan(2, done);

		noStringsMustache(engine, plan);

		noFiles(engine, plan);
	});

	it('qejs', function(done){
		var engine = mengine('qejs');
		var plan = new Plan(2, done);

		engine.renderString('${= }', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		engine.renderFile(__dirname + '/templates/hello_world.ejs', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
	});

	it('ractive', function(done){
		var engine = mengine('ractive');
		var plan = new Plan(2, done);

		noStringsES6(engine, plan);

		noFiles(engine, plan);
	});

	it('swig', function(done){
		var engine = mengine('swig');
		var plan = new Plan(2, done);

		(function(){
			engine.renderStringSync('{{ missingTag( }}', {});
		}).should.throw();

		engine.renderString('{{ missingTag( }}', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		noFiles(engine, plan);
	});

	it('templayed', function(done){
		var engine = mengine('templayed');
		var plan = new Plan(2, done);

		noStringsMustache(engine, plan);

		noFiles(engine, plan);
	});

	it('toffee', function(done){
		var engine = mengine('toffee');
		var plan = new Plan(2, done);

		// the template engine uses console.log for errors so no string methods error tests

		engine.renderString('#{)', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});

		noFiles(engine, plan);
	});

	it('underscore', function(done){
		var engine = mengine('underscore');
		var plan = new Plan(2, done);

		noStringsES6(engine, plan);

		noFiles(engine, plan);
	});

	it('walrus', function(done){
		var engine = mengine('walrus');
		var plan = new Plan(2, done);

		noStringsMustache(engine, plan);

		noFiles(engine, plan);
	});

	it('whiskers', function(done){
		var engine = mengine('whiskers');
		var plan = new Plan(1, done);

		// the template engine uses console.warn for errors so no string methods error tests

		noFiles(engine, plan);
	});

});