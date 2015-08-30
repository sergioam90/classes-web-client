(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyTeacherProfileController', MyTeacherProfileController);

    MyTeacherProfileController.$inject = ['TeacherService', 'MapsService', 'DegreeService', 'CityService'];

    function MyTeacherProfileController(TeacherService, MapsService, DegreeService, CityService) {

        var vm = this;

        vm.teacher = {};
        vm.reviews = [];
        vm.saveTeacher = saveTeacher;
        vm.degreesNames = DegreeService.getAllDegrees();
        vm.formattedAddress = '';
        vm.placeChanged = placeChanged;

        initialize();

        /* Implementation */

        function initialize() {
            loadTeacher();
        }

        function loadTeacher(){
            TeacherService.me().then(function (teacher) {
                vm.teacher = teacher;

                loadReviews(vm.teacher.id);

                loadTeacherAddress(vm.teacher.location);
            }, function () {
                vm.teacher = undefined;
            });
        }

        function loadReviews(id){
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

        function saveTeacher(){

            TeacherService.saveTeacher(vm.teacher).then(function (teacher) {
                // TODO: Is this ok?
                vm.teacher = teacher;
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