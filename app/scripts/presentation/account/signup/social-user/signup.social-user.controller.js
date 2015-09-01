(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupSocialUserController', SignupSocialUserController);

    SignupSocialUserController.$inject = ['user', 'UserService', '$state'];

    function SignupSocialUserController(user, UserService, $state) {
        var vm = this;

        vm.user = user;
        vm.sendConfirmation = sendConfirmation;

        /* Implementation */

        function sendConfirmation() {

            // TODO: Handle errors
            UserService.confirm(vm.user).then(function () {
                $state.go('root.account.user');
            });
        }
    }
})();