(function () {
  'use strict';

  angular
    .module('classesClientApp')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserService', '$location'];

  function RegisterController(UserService, $location) {
    var vm = this;

    vm.register = register;

    // TODO: Check
    function register(user) {
      UserService.register(user).then(registrationSuccess, registrationError);

      function registrationError() {
        alert('Error in registration');
      }

      function registrationSuccess() {
        $location.path('/login');
      }
    }
  }
})();
