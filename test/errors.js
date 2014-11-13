var should = require('should');
var mengine = require('../');
var Plan = require('../lib/util').Plan;

var fullApiMustache = function(engineName, done){
	var engine = mengine(engineName);
	var plan = new Plan(2, done);

	(function(){
		engine.renderStringSync('{{ }}', {});
	}).should.throw();

	engine.renderString('{{ }}', {}, function(err, html){
		err.should.be.an.Error;

		plan.ok(true);
	});

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

		(function(){
			engine.renderFileSync(__dirname + '/templates/nothere', {});
		}).should.throw();

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			done();
		});
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

		(function(){
			engine.renderFileSync(__dirname + '/templates/nothere', {});
		}).should.throw();

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			done();
		});
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

		(function(){
			engine.renderFileSync(__dirname + '/templates/nothere', {});
		}).should.throw();

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
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

		(function(){
			engine.renderFileSync(__dirname + '/templates/nothere', {});
		}).should.throw();

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
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

		(function(){
			engine.renderFileSync(__dirname + '/templates/nothere', {});
		}).should.throw();

		engine.renderFile(__dirname + '/templates/nothere', {}, function(err, html){
			err.should.be.an.Error;

			plan.ok(true);
		});
	});

	it('handlebars', function(done){
		var engine = mengine('handlebars');

		fullApiMustache('handlebars', done);

		// no partials
		(function(){
			engine.renderFileSync(__dirname + '/templates/partials/handlebars/index.handlebars', {});
		}).should.throw();
	});

});