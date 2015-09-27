(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('SignupStepService', SignupStepService);

    SignupStepService.$inject = ['$state'];

    function SignupStepService($state) {

        var previousToFirstStep = 'root.signup-teacher.method';
        var nextToLastStep = 'root.signup-teacher.plan';

        /**
         * TODO: Fix this?
         * This array represents the steps of the teacher signup process
         *      - Array states are a fast but not best solution
         */
        var steps = [
            {
                title: 'Datos personales',
                states: [
                    'root.signup-teacher.step.local-user',
                    'root.signup-teacher.step.social-user',
                    'root.signup-teacher.step.email-sent',
                    'root.signup-teacher.step.facebook'
                ],
                params: {}
            },
            {
                title: 'Materias',
                states: 'root.signup-teacher.step.data',
                params: {
                    step: '0'
                }
            },
            {
                title: 'Tus clases',
                states: 'root.signup-teacher.step.data',
                params: {
                    step: '1'
                }
            },
            {
                title: 'Contacto',
                states: 'root.signup-teacher.step.data',
                params: {
                    step: '2'
                }
            }
        ];

        function hasSameName(name, states) {
            if (angular.isArray(states)) {
                for (var i = 0; i < states.length; i++) {
                    if (name === states[i]) {
                        return true;
                    }
                }

                return false;
            }

            return name === states;
        }

        function getCurrentStepIndex() {

            for (var i = 0; i < steps.length; i++) {

                var sameName = hasSameName($state.current.name, steps[i].states);
                var sameParams = angular.equals($state.params, steps[i].params);

                if (sameName && sameParams) {
                    return i;
                }
            }

            return -1;
        }

        function goToNextStep() {
            var currentStepIndex = getCurrentStepIndex();

            if (currentStepIndex < 0) {
                console.log('SignupStepService: Can\'t get current step');
                return;
            }

            var last = currentStepIndex === steps.length - 1;

            if (last) {
                $state.go(nextToLastStep);
                return;
            }

            $state.go(steps[currentStepIndex + 1].states, steps[currentStepIndex + 1].params);
        }

        function goToPreviousStep() {
            var currentStepIndex = getCurrentStepIndex();

            if (currentStepIndex < 0) {
                console.log('SignupStepService: Can\'t get current step');
                return;
            }

            var first = currentStepIndex === 0;

            if (first) {
                $state.go(previousToFirstStep);
                return;
            }

            $state.go(steps[currentStepIndex - 1].states, steps[currentStepIndex - 1].params);
        }

        function getSteps() {
            return steps;
        }

        return {
            getSteps: getSteps,
            getCurrentStep: getCurrentStepIndex,
            goToPreviousStep: goToPreviousStep,
            goToNextStep: goToNextStep
        };
    }
})();