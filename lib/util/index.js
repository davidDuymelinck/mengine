var assert = require('assert');
var fs = require('fs');
var _ = require('lodash');

function Plan(count, done) {
  this.done = done;
  this.count = count;
}

Plan.prototype.ok = function(expression) {
  assert(expression);

  if (this.count === 0) {
    assert(false, 'Too many assertions called');
  } else {
    this.count--;
  }

  if (this.count === 0) {
    this.done();
  }
};

exports.Plan = Plan;

exports.addPartials = function(partials){
    return _.mapValues(partials, function(file){
      return fs.readFileSync(file, 'utf-8');
    });
  };