'use strict';

/**
 * @ngdoc overview
 * @name classesClientApp
 * @description
 * # classesClientApp
 *
 * Main module of the application.
 */
angular
  .module('classesClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'angular-oauth2',
    'xeditable',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/teachers', {
        templateUrl: 'views/teachers.html',
        controller: 'TeachersCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:8080/');
  })
  .config(['OAuthProvider', 'OAuthTokenProvider', function (OAuthProvider, OAuthTokenProvider) {
    OAuthProvider.configure({
      baseUrl: 'http://localhost:8080',
      clientId: 'CLIENT_ID',
      grantPath: '/oauth/token',
      revokePath: '/'
    });

    OAuthTokenProvider.configure({
      options: {
        secure: false
      }
    });
  }])
  .run(['$rootScope', '$window', 'OAuth', function ($rootScope, $window, OAuth) {
    $rootScope.$on('oauth:error', function (event, rejection) {
      // Ignore `invalid_grant` error - should be catched on `LoginController`.
      if ('invalid_grant' === rejection.data.error) {
        return;
      }

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
        return OAuth.getRefreshToken();
      }

      // Redirect to `/login` with the `error_reason`.
      return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
  }])
  .run(function (editableOptions) {
    editableOptions.theme = 'bs3';
  });
