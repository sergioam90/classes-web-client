(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyUserProfileController', MyUserProfileController);

    MyUserProfileController.$inject = ['UserService', 'AccountService', 'GenderService'];

    function MyUserProfileController(UserService, AccountService, GenderService) {

        var vm = this;

        vm.user = {};
        vm.saveUser = saveUser;
        vm.genders = GenderService.getAllGenders();

        initialize();

        /* Implementation */

        function initialize() {
            loadUser();
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