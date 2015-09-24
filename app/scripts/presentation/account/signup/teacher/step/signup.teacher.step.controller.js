(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupTeacherStepController', SignupTeacherStepController);

    SignupTeacherStepController.$inject = ['SignupStepService'];

    function SignupTeacherStepController(SignupStepService) {
        var vm = this;

        vm.steps = SignupStepService.getSteps();

        initialize();

        /* Implementation */
        function initialize() {

        }
    }
})();
