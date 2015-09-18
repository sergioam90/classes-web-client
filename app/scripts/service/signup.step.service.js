(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('SignupStepService', SignupStepService);

    SignupStepService.$inject = [];

    function SignupStepService() {

        var currentStep = -1;

        function getCurrentStep() {
            return currentStep;
        }

        function setCurrentStep(number) {
            currentStep = number;
        }

        return {
            getCurrentStep: getCurrentStep,
            setCurrentStep: setCurrentStep
        };
    }
})();