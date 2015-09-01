(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyTeacherProfileController', MyTeacherProfileController);

    MyTeacherProfileController.$inject = ['teacher', 'TeacherService', 'MapsService', 'DegreeService', 'CityService'];

    function MyTeacherProfileController(teacher, TeacherService, MapsService, DegreeService, CityService) {

        var vm = this;

        vm.teacher = teacher;
        vm.reviews = [];
        vm.saveTeacher = saveTeacher;
        vm.degreesNames = DegreeService.getAllDegrees();
        vm.formattedAddress = '';
        vm.placeChanged = placeChanged;

        initialize();

        /* Implementation */

        function initialize() {
            if (vm.teacher) {
                loadTeacher();
            }
        }

        function loadTeacher() {
            loadReviews(vm.teacher.id);

            loadTeacherAddress(vm.teacher.location);
        }

        function loadReviews(id) {
            TeacherService.reviews(id).then(function (page) {

                // TODO: Work with page not just content
                vm.reviews = page.content;
            });
        }

        function loadTeacherAddress(location) {
            MapsService.getAddress(location).then(function (result) {
                vm.formattedAddress = result;
                console.log(result);
            }, function (error) {
                console.log('Error loading address: ');
                console.log(error);
            });
        }

        function saveTeacher() {

            TeacherService.saveTeacher(vm.teacher).then(function (teacher) {
                // TODO: Is this ok?
                vm.teacher = teacher;
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

                vm.teacher.location = {
                    latitude: place.geometry.location.G,
                    longitude: place.geometry.location.K,
                    city: locality
                };

                vm.saveTeacher();
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