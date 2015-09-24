(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupSocialUserController', SignupSocialUserController);

    SignupSocialUserController.$inject = ['user', 'UserService', '$state'];

    function SignupSocialUserController(user, UserService, $state) {
        var vm = this;

        var target = $state.current.data.target;

        vm.user = user;

        vm.sendConfirmation = sendConfirmation;

        /* Implementation */
        function sendConfirmation() {
            var tempUser = angular.copy(user);

            tempUser.target = target;

            // TODO: Handle errors
            UserService.confirm(tempUser).then(function () {
                $state.go('root.signup-' + target + '.step.data');
            });
        }
    }
})();