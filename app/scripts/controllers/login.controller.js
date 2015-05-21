'use strict';

/**
 * @ngdoc function
 * @name classesClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the classesClientApp
 */
angular.module('classesClientApp')
  .controller('LoginCtrl', function ($scope, UserService, $routeParams, $location, $rootScope) {

    $scope.login = function (user) {
      UserService.login(user).then(function () {
        $location.path($routeParams.redirectUrl || '/');
      });
    };

    $scope.isAuthenticated = function () {
      return UserService.isAuthenticated();
    };

    $rootScope.$on('oauth:error', function (event, rejection) {
      if (rejection.data.error === 'invalid_grant')
        $scope.login.$error = {'badCredentials': 'true'};
    });

  });
