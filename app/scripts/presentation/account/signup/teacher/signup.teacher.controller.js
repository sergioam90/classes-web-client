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
        'SignupStepService'
    ];

    function SignupTeacherController(user, TeacherService, DegreeService, Subjects, MapsService, CityService, InterruptionService, SignupStepService) {
        var vm = this;

        /* Default teacher values */
        vm.teacher = {
            groupLessons: false,
            homeLessons: false,
            individualLessons: false,
            phone: {
                whatsApp: false
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

        var internalSteps = 2;
        var signupTeacherStepNumber = SignupStepService.getCurrentStep();
        vm.stepOffset = 0;

        vm.placeChanged = placeChanged;
        vm.signupTeacher = signupTeacher;
        vm.nextStep = nextStep;
        vm.previousStep = previousStep;

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
                if (vm.subjects[i].selected) {
                    // Add to send array
                    vm.teacher.subjects.push(vm.subjects[i]);

                    // Clear subject selection
                    vm.teacher.subjects[vm.teacher.subjects.length - 1].selected = undefined;
                }
            }

            TeacherService.signupTeacher(vm.teacher).then(function () {
                InterruptionService.restore();
            });
        }

        function placeChanged() {
            var place = this.getPlace();
            console.log(place);

            MapsService.getLocality(place).then(success, error);

            function success(locality) {

                if (!validLocality(locality)) {
                    // TODO: Add error handling
                    alert('City is not valid');

                    return;
                }

                vm.teacher.location = {
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

        function nextStep() {
            if (vm.stepOffset >= internalSteps) {
                //$state.go('root.home');
            } else {
                vm.stepOffset++;
                SignupStepService.setCurrentStep(signupTeacherStepNumber + vm.stepOffset);
            }
        }

        function previousStep() {
            if (vm.stepOffset > 0) {
                vm.stepOffset--;
                SignupStepService.setCurrentStep(signupTeacherStepNumber + vm.stepOffset);
            }
        }
    }
})();
