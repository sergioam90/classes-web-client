(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupUserController', SignupUserController);

    SignupUserController.$inject = ['InterruptionService'];

    function SignupUserController(InterruptionService) {
        var vm = this;

        vm.restoreState = restoreState;

        // TODO: Get email from somewhere

        /* Implementation */

        function restoreState() {
            InterruptionService.restore();
        }

    }

})();