(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyUserProfileController', MyUserProfileController);

    MyUserProfileController.$inject = ['UserService', 'AccountService'];

    function MyUserProfileController(UserService, AccountService) {

        var vm = this;

        vm.user = {};
        vm.saveUser = saveUser;

        initialize();

        /* Implementation */

        function initialize() {
            loadUser();
        }

        function loadUser(){
            vm.user = AccountService.me;
        }

        function saveUser(){
            UserService.saveUser(vm.user).then(loadUser);
        }
    }
})();