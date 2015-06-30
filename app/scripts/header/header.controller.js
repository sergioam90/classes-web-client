(function () {
  'use strict';

  angular
    .module('classesClientApp')
    .controller('HeaderCtrl', HeaderController);

  HeaderController.$inject = ['$location', 'OAuth', 'UserService']

  function HeaderController($location, OAuth, UserService) {
    var vm = this;

    vm.isActive = isActive;
    vm.isAuthenticated = OAuth.isAuthenticated;
    vm.logout = logout;

    // TODO: Check this
    if (UserService.isAuthenticated()) {
      UserService.me();
    }

    ////////////////

    function isActive(viewLocation) {
      return viewLocation === $location.path();
    }

    function logout() {
      UserService.logout();
      $location.path('/');
    }
  }

})();
