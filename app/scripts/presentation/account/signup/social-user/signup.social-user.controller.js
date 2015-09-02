(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupSocialUserController', SignupSocialUserController);

    SignupSocialUserController.$inject = ['user', 'UserService', '$state', '$location'];

    function SignupSocialUserController(user, UserService, $state, $location) {
        var vm = this;

        var target = $location.search().target;

        vm.user = user;
        vm.sendConfirmation = sendConfirmation;

        /* Implementation */

        function sendConfirmation() {

            // TODO: Handle errors
            UserService.confirm(vm.user).then(function () {
                if (angular.isDefined(target)) {
                    $state.go('root.signup.' + target);
                } else {
                    $state.go('root.account.user');
                }
            });
        }
    }
})();