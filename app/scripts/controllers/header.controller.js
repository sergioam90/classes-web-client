'use strict';

/**
 * @ngdoc function
 * @name classesClientApp.controller:HeaderControllerCtrl
 * @description
 * # HeaderControllerCtrl
 * Controller of the classesClientApp
 */
angular.module('classesClientApp')
  .controller('HeaderCtrl', function ($scope, $location, OAuth, UserService, OAuthToken) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function () {
      return OAuth.isAuthenticated();
    };

    $scope.logout = function () {
      UserService.logout();
      $location.path("/");
    };

    if(UserService.isAuthenticated()) {
      UserService.me();
    }

  });
