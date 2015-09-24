(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupLocalUserEmailSentController', SignupLocalUserEmailSentController);

    SignupLocalUserEmailSentController.$inject = ['InterruptionService', '$state', '$stateParams', '$interval', 'OAuthToken'];

    function SignupLocalUserEmailSentController(InterruptionService, $state, $stateParams, $interval, OAuthToken) {
        var vm = this;

        // Data
        var target = $state.current.data.target;
        var loginCheckPromise;

        vm.waiting = true;

        // Functions

        vm.restoreState = restoreState;

        // TODO: Get email from somewhere

        initialize();

        /* Implementation */

        function initialize() {

            loginCheckPromise = $interval(function () {
                if (OAuthToken.getToken()) {
                    loginDetected();
                }
            }, 1000);
        }

        function restoreState() {
            InterruptionService.restore();
        }

        function loginDetected() {
            $interval.cancel(loginCheckPromise);

            vm.waiting = false;

            $state.go('root.signup-' + target + '.step.data');
        }

    }

})();