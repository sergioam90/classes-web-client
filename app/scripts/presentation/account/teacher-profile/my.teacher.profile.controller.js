(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyTeacherProfileController', MyTeacherProfileController);

    MyTeacherProfileController.$inject = ['TeacherService', 'MapsService', 'DegreeService'];

    function MyTeacherProfileController(TeacherService, MapsService, DegreeService) {

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
            });
        }

        function loadReviews(id){
            TeacherService.reviews(id).then(function (page) {

                // TODO: Work with page not just content
                vm.reviews = page.content;
            });
        }

        function loadTeacherAddress(){
            MapsService.getAddress(location).then(function (result) {
                vm.formattedAddress = result;
            });
        }

        function saveTeacher(){
            vm.teacher.degree = undefined;
            vm.teacher.distance = undefined;
            vm.teacher.location = undefined;
            vm.teacher.schedule = undefined;
            vm.teacher.phone = undefined;
            vm.teacher.subjects = undefined;
            vm.teacher.user = undefined;
            vm.teacher.averageRating = undefined;
            vm.teacher.review = undefined;
            vm.teacher.isFavorite = undefined;

            var teacher = {id: vm.teacher.id, fee: vm.teacher.fee};

            TeacherService.saveTeacher(teacher).then(function (teacher) {
                // TODO: Is this ok?
                vm.teacher = teacher;
            });
        }

        function placeChanged() {
            var place = this.getPlace();
            vm.teacher.location = {
                latitude: place.geometry.location.G,
                longitude: place.geometry.location.K
            };
        }
    }
})();