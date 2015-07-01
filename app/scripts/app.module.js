(function () {
  'use strict';

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
      'ui.bootstrap',
      'ui.router'
    ])
    .run(function (editableOptions) {
      editableOptions.theme = 'bs3';
    });


})();
