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
        '$state'
    ];

    function SignupTeacherController(user, TeacherService, DegreeService, Subjects, MapsService, CityService, $state) {
        var vm = this;

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

        vm.placeChanged = placeChanged;
        vm.signupTeacher = signupTeacher;

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
                $state.go('root.account.teacher');
            });
        }

        function placeChanged() {
            var place = this.getPlace();
            console.log(place);


            MapsService.getLocality(place).then(success, error);

            function success(locality) {

                if (!validLocality(locality)) {
                    // TODO: Add error handling
                    console.log('City is not valid');

                    return;
                }

                vm.teacher.location = {
                    latitude: place.geometry.location.G,
                    longitude: place.geometry.location.K,
                    city: locality
                };

                console.log(vm.teacher.location);
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
