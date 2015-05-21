'use strict';

describe('Service: subjects', function () {

  // load the service's module
  beforeEach(module('classesClientApp'));

  // instantiate service
  var subjects;
  beforeEach(inject(function (_subjects_) {
    subjects = _subjects_;
  }));

  it('should do something', function () {
    expect(!!subjects).toBe(true);
  });

});
