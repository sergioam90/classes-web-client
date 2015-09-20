(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['SignupStepService'];

    function SignupController(SignupStepService) {
        var vm = this;

        vm.getCurrentStep = getCurrentStep;

        vm.steps = [
            {
                title: 'Introducción',
                clickable: false
            },
            {
                title: 'Login',
                clickable: false
            },
            {
                title: 'Datos personales',
                clickable: false
            },
            {
                title: 'Materias',
                clickable: true
            },
            {
                title: 'Sobre tus clases',
                clickable: true
            },
            {
                title: 'Contacto',
                clickable: true
            },
            {
                title: 'Premium',
                clickable: true
            }
        ];

        initialize();

        /* Implementation */

        function initialize() {

        }

        function getCurrentStep() {
            return SignupStepService.getCurrentStep();
        }

    }
})();
