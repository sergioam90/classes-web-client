(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupPlanUnavailableController', SignupPlanUnavailableController);

    SignupPlanUnavailableController.$inject = ['$state'];

    function SignupPlanUnavailableController($state) {
        var vm = this;

        vm.redirect = redirect;

        initialize();

        /* Implementation */
        function initialize() {

        }

        function redirect() {
            $state.go('root.signup-teacher.congratulations');
        }
    }
})();
