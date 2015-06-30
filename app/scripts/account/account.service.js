(function () {
  'use strict';

  angular
    .module('classesClientApp')
    .service('AccountService', AccountService);

  AccountService.$inject = [];

  function AccountService(Users, OAuth, OAuthToken, $rootScope) {

    var vm = this;

    vm.register = register;
    vm.isAuthenticated = OAuth.isAuthenticated;
    vm.login = login;
    vm.logout = logout;
    vm.me = me;

    ////////

    function register(user) {
      return Users.post(user);
    }

    function me() {
      return Users.one('me').get().then(function (user) {
        $rootScope.currentUser = user;
      });
    }

    function logout() {
      return OAuthToken.removeToken();
    }

    function login(user) {
      if (vm.isAuthenticated()) {
        vm.logout();
      }
      return OAuth.getAccessToken(user).then(vm.me);
    }

  }


})();
