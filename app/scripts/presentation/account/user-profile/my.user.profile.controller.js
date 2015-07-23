(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyUserProfileController', MyUserProfileController);

    MyUserProfileController.$inject = ['UserService'];

    function MyUserProfileController(UserService) {

        var vm = this;

        vm.user = {};
        vm.saveUser = saveUser;

        initialize();

        /* Implementation */

        function initialize() {
            loadUser();
        }

        function loadUser(){
            UserService.me().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser(){
            UserService.saveUser(vm.user).then(function(user){
                vm.user = user;
            });
        }
    }
})();