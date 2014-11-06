# mengine

## Motivation

I wanted a package that allowed me to swap template engines with minimal configuration.
After looking at the [consolidate](https://www.npmjs.org/package/consolidate) package code I had a few questions.

Why is the template name method the one that renders a file?

Why does the render method renders a string template?

Why isn't it possible to use the template engine directly?

Why are all the methods in one file?

The answer to these questions lead me to create a new package.

## Usage

    var engine = require('mengine')('ejs');

The `engine` variable exposes:

- engine : the template engine instance
- renderFile: renders a file based template
- render: renders a string based template

Template engines that have a renderFile and render method:

- haml
- jade



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

If there is no configuration file mengine will search for a configfile for the template engine.
If there isn't one the engine object, a renderFile and render method are added to the object if they are found.
There is no error when the methods aren't found.

If the template language allows the change of the open and close strings, the package configuration will set them to {{ and }} respectively.

## Tests

Look in the test directory if you want more documentation.

Run the tests after installing the package with `npm test`.