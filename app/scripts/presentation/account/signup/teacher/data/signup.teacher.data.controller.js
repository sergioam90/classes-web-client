(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupTeacherController', SignupTeacherController);

    SignupTeacherController.$inject = [
        'user',
        'TeacherService',
        'DegreeService',
        'Subjects',
        'MapsService',
        'CityService',
        'InterruptionService',
        '$stateParams',
        'SignupStepService'
    ];

    function SignupTeacherController(user, TeacherService, DegreeService, Subjects, MapsService, CityService, InterruptionService, $stateParams, SignupStepService) {
        var vm = this;

        /* Default teacher values */
        vm.teacher = {
            groupLessons: false,
            homeLessons: false,
            individualLessons: false,
            phone: {
                whatsApp: false,
                sms: false
            },
            schedule: {
                morning: false,
                afternoon: false,
                night: false
            },
            averageRating: 0,
            user: user
        };

        vm.degrees = [];
        vm.subjects = [];

        vm.stepOffset = $stateParams.step;

        vm.placeChanged = placeChanged;
        vm.signupTeacher = signupTeacher;
        vm.goToNextStep = goToNextStep;
        vm.goToPreviousStep = goToPreviousStep;

        initialize();

        /* Implementation */

        function initialize() {
            vm.degrees = DegreeService.getAllDegrees();

            Subjects.getList().then(function (result) {
                vm.subjects = result.plain();
            });
        }

        function signupTeacher() {
            vm.teacher.subjects = [];

            for (var i = 0; i < vm.subjects.length; i++) {
                if (vm.subjects[i].$$selected) {
                    // Add to send array
                    vm.teacher.subjects.push(vm.subjects[i]);

                    // Clear subject selection
                    vm.teacher.subjects[vm.teacher.subjects.length - 1].$$selected = undefined;
                }
            }

            TeacherService.signupTeacher(vm.teacher).then(function () {
                alert('registered successfully');
                //InterruptionService.restore();
            });
        }

        function placeChanged() {
            var place = this.getPlace();

            MapsService.getLocality(place).then(success, error);

            function success(locality) {

                if (!validLocality(locality)) {
                    // TODO: Add error handling
                    alert('City is not valid');

                    return;
                }

                vm.teacher.location = {
                    address: MapsService.getStreetName(place),
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
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

        function goToNextStep() {
            SignupStepService.goToNextStep();
        }

        function goToPreviousStep() {
            SignupStepService.goToPreviousStep();
        }
    }
})();
