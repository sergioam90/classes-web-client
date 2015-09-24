(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('signupSteps', SignupStepsDirective);

    SignupStepsDirective.$inject = ['SignupStepService'];

    function SignupStepsDirective(SignupStepService) {

        function link(scope) {
            scope.isCurrentStep = isCurrentStep;
            scope.isPastStep = isPastStep;
            scope.isFutureStep = isFutureStep;

            function isCurrentStep(index) {
                return SignupStepService.getCurrentStep() === index;
            }

            function isPastStep(index) {
                return SignupStepService.getCurrentStep() > index;
            }

            function isFutureStep(index) {
                return SignupStepService.getCurrentStep() < index;
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
