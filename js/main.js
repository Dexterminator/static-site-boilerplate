var _ = require('lodash');

function test() {
  return _.map([1, 2, 3], function (num) {
    return num + 1;
  });
}

console.log(test());
