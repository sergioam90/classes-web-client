(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AccountService', 'Degrees', 'Subjects', '$location', '$stateParams'];

    function RegisterController(AccountService, Degrees, Subjects, $location, $stateParams) {
        var vm = this;

        vm.register = register;
        vm.target = $stateParams.target;
        vm.user = {};
        vm.teacher = {};
        vm.student = {};

        Degrees.getList().then(processDegrees);
        Subjects.getList().then(processSubjects);

        /* Implementations */

        // TODO: Check
        function register(user) {
            AccountService.register(user).then(registrationSuccess, registrationError);

            function registrationError() {
                alert('Error in registration');
            }

            function registrationSuccess() {
                $location.path('/login');
            }
        }

        function processDegrees(degrees) {
            vm.degreesNames = degrees.plain();
        }

        function processSubjects(subjects) {
            vm.subjects = subjects.plain();
        }
    }
})();
