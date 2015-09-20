(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('signupSteps', SignupStepsDirective);

    SignupStepsDirective.$inject = ['SignupStepService'];

    function SignupStepsDirective(SignupStepService) {

        function link(scope) {
            scope.isCurrentStep = isCurrentStep;
            scope.setCurrentStep = setCurrentStep;

            function isCurrentStep(index) {
                return SignupStepService.getCurrentStep() === index + 1;
            }

            function setCurrentStep(index) {
                SignupStepService.setCurrentStep(index + 1);
            }
        }

        return {
            restrict: 'E',
            scope: {
                steps: '='
            },
            templateUrl: 'scripts/directive/signup-steps/signup-steps.template.html',
            link: link
        };
    }
})();
