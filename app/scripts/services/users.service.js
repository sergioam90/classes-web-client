'use strict';

/**
 * @ngdoc service
 * @name classesClientApp.users.service
 * @description
 * # users.service
 * Service in the classesClientApp.
 */
angular.module('classesClientApp')
  .service('UserService', function (Users, OAuth, OAuthToken, $rootScope) {

    this.register = function (user) {
      return Users.post(user);
    };

    this.me = function () {
      return Users.one('me').get().then(function (user) {
        $rootScope.currentUser = user;
      });
    };

    this.logout = function () {
      return OAuthToken.removeToken();
    };

    this.login = function (user) {
      if (OAuth.isAuthenticated())
        this.logout();

      return OAuth.getAccessToken(user).then(this.me);
    };

    this.isAuthenticated = function () {
      return OAuth.isAuthenticated();
    };
  });
