'use strict';

describe('Service: students', function () {

  // load the service's module
  beforeEach(module('classesClientApp'));

  // instantiate service
  var students;
  beforeEach(inject(function (_students_) {
    students = _students_;
  }));

  it('should do something', function () {
    expect(!!students).toBe(true);
  });

});
