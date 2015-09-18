(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .run(Run);

    Run.$inject = ['$rootScope', 'InterruptionService', 'SignupStepService'];

    function Run($rootScope, InterruptionService, SignupStepService) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            // TODO: Improve design

            // TODO: Check second conditoion. Used when coming from nowhere, initial search.
            if (toState.data && fromState.name !== '') {
                if (toState.data.isInterruption) {
                    if (!fromState.data || !fromState.data.isInterruption) {
                        InterruptionService.interrupt();
                    }
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (toState.data && toState.data.stepNumber) {
                SignupStepService.setCurrentStep(toState.data.stepNumber);
            }
        });
    }

})();
