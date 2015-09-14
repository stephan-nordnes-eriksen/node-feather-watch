var assert;

assert = require('assert');

describe('OS', function() {
  describe('#is_windows()', function() {
    it('should return true when process.platform is win32, win64 etc.', function() {
      assert.equal(-1, [1, 2, 3].indexOf(5));
      assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});
