(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupPlanController', SignupPlanController);

    SignupPlanController.$inject = ['ModalService'];

    function SignupPlanController(ModalService) {
        var vm = this;

        vm.showUnavailableModal = showUnavailableModal;

        initialize();

        /* Implementation */
        function initialize() {

        }

        function showUnavailableModal() {
            ModalService.open({
                templateUrl: 'scripts/presentation/account/signup/teacher/plan/unavailable/signup.plan.unavailable.html',
                controller: 'SignupPlanUnavailableController as vm'
            });
        }
    }
})();
