(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyUserProfileController', MyUserProfileController);

    MyUserProfileController.$inject = ['UserService', 'AccountService', 'GenderService'];

    function MyUserProfileController(UserService, AccountService, GenderService) {

        var vm = this;

        vm.saveUser = saveUser;
        vm.genders = GenderService.getAllGenders();

        initialize();

        /* Implementation */

        function initialize() {
            loadUser();
        }

        function loadUser(){
            AccountService.me().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser(){
            UserService.saveUser(vm.user).then(loadUser);
        }
    }
})();