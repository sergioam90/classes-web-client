'use strict';

/**
 * @ngdoc function
 * @name classesClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the classesClientApp
 */
angular.module('classesClientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
