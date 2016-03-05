'use strict';

describe('githubInspector.version module', function() {
  beforeEach(module('githubInspector.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
