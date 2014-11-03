# mengine

## Motivation

I wanted a package that allowed me to swap template engines with minimal configuration.
After looking at the [consolidate](https://www.npmjs.org/package/consolidate) package code I had a few questions.

Why is the template name method the one that renders a file?

Why does the render method renders a string template?

Why isn't it possible to use the template engine directly?

Why are all the methods in one file?

The answer to these questions let me to create a new package.

## Usage

    var engine = require('mengine')('ejs');

The `engine` variable exposes:

- engine : the template engine instance
- renderFile: renders a file based template
- render: renders a string based template

Mengine has a second parameter which allows you to add or overwrite the template engine configuration.

config/template_engine/ejs.js

    var ejs = require('ejs');

    module.exports = function(mengine){
        ejs.filters.last = function(obj) {
            return obj[obj.length - 1];
        };

        mengine.renderFile = ejs.renderFile;

        mengine.render = ejs.render;

        return mengine;

    };

The call from a root file would be;

    var engine = require('mengine')('ejs', './config/template/ejs');

If there is no configuration file mengine will search for a renderFile and render method and add them to the object.
There is no error when the methods aren't found.

## Tests

Look in the test directory if you want more documentation.

Run the tests after installing the package with `npm test`.