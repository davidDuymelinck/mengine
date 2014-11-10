# mengine

men-gine, it has nothing to do with gender. Men comes from the dutch verb mennen which means lead.

## Motivation

I wanted a package that allowed me to swap template engines with minimal configuration and changes.
After looking at the [consolidate](https://www.npmjs.org/package/consolidate) package code I had a few questions.

Why is the template name method the one that renders a file?

Why does the render method renders a string template?

Why isn't it possible to use the template engine directly?

Why are all the methods in one file?

The answer to these questions lead me to create a new package.

## Usage

    var engine = require('mengine')('ejs');

The `engine` variable exposes:

- engine: the template engine instance
- renderString: it the template engine supports asynchrone actions
- renderStringSync: if the template engine supports synchrone actions
- renderFile: it the template engine supports asynchrone actions
- renderFileSync: if the template engine supports synchrone actions

Mengine has a second parameter which allows you to add or overwrite the template engine configuration.

config/template_engine/ejs.js

    var ejs = require('ejs');

    module.exports = function ejsConfig(){
        ejs.open = '<%';
        ejs.close = '%>'

        var out = {};

        out.engine = ejs;

        out.renderFile = ejs.renderFile;

        out.renderString = function(str, options, fn){
            try{
                fn(null, ejs.render(str, options));
            }catch(er){
                fn(err);
            }
        };

        return out;
    };

The call from a root file would be;

    var engine = require('mengine')('ejs', './config/template/ejs');

If there is no custom configuration file mengine will search for a configuration file in the lib/config directory. The following template engines are supported:

- [atpl](https://github.com/soywiz/atpl.js)
- [eco](https://github.com/sstephenson/eco)
- [ect](https://github.com/baryshev/ect)*
- [ejs](https://github.com/tj/ejs)*
- [haml-coffee](https://github.com/9elements/haml-coffee)
- [haml](https://github.com/tj/haml.js)
- [handlebars](https://github.com/wycats/handlebars.js/)
- [hogan](https://github.com/twitter/hogan.js)
- [jade](https://github.com/jadejs/jade)
- [jazz](https://github.com/shinetech/jazz)
- [just](https://github.com/baryshev/just)*
- [liquor](https://github.com/chjj/liquor)
- [lodash](https://github.com/lodash/lodash)*
- [mustache](https://github.com/janl/mustache.js)
- [nunjucks](https://github.com/mozilla/nunjucks)
- [qejs](https://github.com/jepso/QEJS)*
- [ractive](https://github.com/ractivejs/ractive)*
- [swig](https://github.com/paularmstrong/swig)
- [templayed](https://github.com/archan937/templayed.js/)
- [toffee](https://github.com/malgorithms/toffee)
- [underscore](https://github.com/jashkenas/underscore)*
- [walrus](https://github.com/jeremyruppel/walrus)
- [whiskers](https://github.com/gsf/whiskers.js)

If the template language allows the change of the open and close strings, marked above with *, the package configuration will set them to ${ and } respectively.

## Tests

Look in the test directory if you want more documentation.

Run the tests after installing the package with `npm test`.