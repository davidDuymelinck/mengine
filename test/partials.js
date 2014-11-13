var should = require('should');
var mengine = require('../');
var Plan = require('../lib/util').Plan;

var data = { title: 'Hello world'};

describe('Partials/inheritance', function(){

	it('atpl should have extended layout and included include template', function(){
		var engine = mengine('atpl');

		engine.renderFileSync(__dirname + '/templates/partials/atpl/index.mustache', data)
					.should.containEql('html')
					.and.containEql(data.title)
					.and.containEql('Included');
	});

	it('dust should have extended layout and included include template', function(done){
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
		var engine = mengine('ect');

		engine.engine.configure({root: __dirname + '/templates/partials/ect'});

		engine.renderFileSync('index.ect', data)
					.should.containEql('html')
					.and.containEql(data.title)
					.and.containEql('Included');
	});

	it('ejs should have included head and footer template', function(){
		var engine = mengine('ejs');

		data.filename = __dirname + '/templates/partials/ejs/index.ejs';

		engine.renderFileSync(__dirname + '/templates/partials/ejs/index.ejs', data)
					.should.containEql('html')
					.and.containEql(data.title)
					.and.containEql('Footer');
	});

	it('haml-coffee should have included head and footer template', function(){
		var engine = mengine('haml-coffee');

		engine.renderFileSync(__dirname + '/templates/partials/haml-coffee/index.hamlcoffee', data)
					.should.containEql('html')
					.and.containEql(data.title)
					.and.containEql('Footer');
	});

	it('handlebars should have included head and footer template', function(){
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
		var engine = mengine('jade');

		engine.renderFileSync(__dirname + '/templates/partials/jade/index.haml', data)
					.should.containEql('html')
					.and.containEql(data.title)
					.and.containEql('Included');
	});

	it('just should have extended layout and included include template', function(done){
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
		var engine = mengine('nunjucks');

		engine.renderFileSync(__dirname + '/templates/partials/nunjucks/index.mustache', data)
				.should.containEql('html')
					.and.containEql(data.title)
					.and.containEql('Included');
	});

	it('qejs should have extended layout and included include template', function(done){
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
		var engine = mengine('swig');

		engine.renderFileSync(__dirname + '/templates/partials/swig/index.mustache', data)
				.should.containEql('html')
					.and.containEql(data.title)
					.and.containEql('Included');
	});

	it('toffee should have extended layout and included include template', function(done){
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
