(function () {
    'use strict';

  // TODO: Use ui-router
  angular
    .module('classesClientApp')
    .config(RouterConfig);

  RouterConfig.$inject = ['$routeProvider'];

  function RouterConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/presentation/main/main.html',
        controller: 'MainController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/teachers', {
        templateUrl: 'views/teachers.html',
        controller: 'TeachersController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
