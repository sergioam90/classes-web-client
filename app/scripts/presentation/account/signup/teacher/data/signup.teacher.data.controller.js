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
        'SignupStepService',
        '$location',
        '$scope'
    ];

    function SignupTeacherController(user, TeacherService, DegreeService, Subjects, MapsService, CityService, InterruptionService, $stateParams, SignupStepService, $location, $scope) {
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

        vm.teacher.$$location = undefined;

        // TODO: Do this better
        $scope.$watch(function () {
            return $location.search();
        }, function () {
            if ($location.search().step) {
                vm.stepOffset = parseInt($location.search().step);
            } else {
                vm.stepOffset = 0;
            }
        });


        vm.degrees = [];
        vm.subjects = [];

        vm.stepOffset = parseInt($stateParams.step);

        vm.formsSpecs = [];
        vm.teacherSignupFormPrefix = 'teacherSignupFormStep';

        vm.validateSchedule = validateSchedule;
        vm.validateAudience = validateAudience;
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
                SignupStepService.goToNextStep();
            });
        }

        function placeChanged() {
            var place = this.getPlace();

            // Set hidden location input dirty to make validation message visible
            vm.forms[1].location.$setDirty();

            MapsService.getLocality(place).then(success, error);

            function success(locality) {

                vm.teacher.location = {
                    address: MapsService.getStreetName(place),
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    city: locality
                };

                // Set $$location to fulfill location required validation
                vm.teacher.$$location = vm.teacher.location;
            }

            function error(error) {
                console.log(error);
            }

        }

        function goToNextStep() {

            // Validate current and previous steps
            for (var i = 0; i <= vm.stepOffset; i++) {
                if (!validateStep(i)) {
                    setSubmittedForm(i);
                    return;
                }
            }

            // If it's the last data step
            if (vm.stepOffset === 2) {
                signupTeacher();
                return;
            }

            SignupStepService.goToNextStep();
        }

        function goToPreviousStep() {
            SignupStepService.goToPreviousStep();
        }

        function validateStep(step) {
            var form = getFormByStep(step);

            return form.$valid;
        }

        function setSubmittedForm(step) {
            vm.forms[step].submitted = true;
        }

        function getFormByStep(step) {
            return vm.forms[step];
        }

        function validateSchedule() {
            var schedule = vm.teacher.schedule;

            if (schedule.morning || schedule.afternoon || schedule.night) {
                vm.teacher.$$schedule = {};
            } else {
                vm.teacher.$$schedule = undefined;
            }
        }

        function validateAudience() {
            if (vm.teacher.groupLessons || vm.teacher.individualLessons) {
                vm.teacher.$$audience = {};
            } else {
                vm.teacher.$$audience = undefined;
            }
        }
    }
})();
