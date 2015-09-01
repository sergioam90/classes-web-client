(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyUserProfileController', MyUserProfileController);

    MyUserProfileController.$inject = ['user', 'UserService', 'AccountService', 'GenderService'];

    function MyUserProfileController(user, UserService, AccountService, GenderService) {

        var vm = this;

        vm.user = user;
        vm.saveUser = saveUser;
        vm.genders = GenderService.getAllGenders();

        initialize();

        /* Implementation */

        function initialize() {
        }

        function loadUser(){
            AccountService.loadUser().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser(){
            vm.user.birthDate = moment(vm.user.birthDate).format('YYYY-MM-DD');

            UserService.saveUser(vm.user).then(loadUser);
        }
    }
})();