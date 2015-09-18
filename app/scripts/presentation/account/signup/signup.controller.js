(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['SignupStepService'];

    function SignupController(SignupStepService) {
        var vm = this;

        vm.getCurrentStep = getCurrentStep;

        initialize();

        /* Implementation */

        function initialize() {

        }

        function getCurrentStep() {
            return SignupStepService.getCurrentStep();
        }

    }
})();
