(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupStudentController', SignupStudentController);

    SignupStudentController.$inject = ['StudentService', 'MapsService', 'CityService', 'InterruptionService'];

    function SignupStudentController(StudentService, MapsService, CityService, InterruptionService) {
        var vm = this;

        vm.student = {};

        vm.placeChanged = placeChanged;
        vm.signupStudent = signupStudent;

        initialize();

        /* Implementation */

        function initialize() {
        }

        function signupStudent() {
            // TODO: Handle errors
            StudentService.signupStudent(vm.student).then(function () {
                InterruptionService.restore();
            });
        }

        function placeChanged() {
            var place = this.getPlace();

            MapsService.getLocality(place).then(success, error);

            function success(locality) {

                if (!validLocality(locality)) {
                    // TODO: Add error handling
                    console.log('City is not valid');

                    return;
                }

                vm.student.location = {
                    latitude: place.geometry.location.G,
                    longitude: place.geometry.location.K,
                    city: locality
                };
            }

            function error(error) {
                console.log(error);
            }

            function validLocality(locality) {
                return CityService.exists(locality);
            }

        }

    }
})();
