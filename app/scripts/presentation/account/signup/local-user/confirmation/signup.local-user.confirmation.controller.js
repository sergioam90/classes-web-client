(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('LocalUserConfirmationController', LocalUserConfirmationController);

    LocalUserConfirmationController.$inject = ['InterruptionService', '$state', '$stateParams', '$interval', 'OAuthToken'];

    function LocalUserConfirmationController(InterruptionService, $state, $stateParams, $interval, OAuthToken) {
        var vm = this;

        // Data
        var target = $stateParams.target || null;
        var loginCheckPromise;

        vm.waiting = true;

        // Functions

        vm.restoreState = restoreState;

        // TODO: Get email from somewhere

        initialize();

        /* Implementation */

        function initialize() {

            loginCheckPromise = $interval(function () {
                console.log('token: ');
                console.log(OAuthToken.getToken());
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

            $state.go('root.signup.' + target);
        }

    }

})();