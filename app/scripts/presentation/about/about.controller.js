(function() {
  'use strict';

  angular
    .module('classesClientApp')
    .controller('AboutCtrl', AboutController);

  function AboutController() {
    var vm = this;

    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
})();
