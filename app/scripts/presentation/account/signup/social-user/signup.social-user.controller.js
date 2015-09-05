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

        vm.confirmAsStudent = confirmAsStudent;
        vm.confirmAsTeacher = confirmAsTeacher;


        /* Implementation */

        function sendConfirmation(target) {
            var finalTarget = target || vm.user.target;

            if (finalTarget) {

                var tempUser = angular.copy(user);

                tempUser.target = finalTarget;

                // TODO: Handle errors
                UserService.confirm(tempUser).then(function () {
                    $state.go('root.signup.' + tempUser.target);
                });
            } else {
                // TODO: Handle errors
                alert('Not user target defined');
            }
        }

        function confirmAsTeacher() {
            sendConfirmation('teacher');
        }

        function confirmAsStudent() {
            sendConfirmation('student');
        }
    }
})();