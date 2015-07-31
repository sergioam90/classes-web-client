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
        vm.degrees = DegreeService.getAllDegrees();

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
            TeacherService.reviews(id).then(function(reviews){
                vm.reviews = reviews;
            });
        }

        function loadTeacherAddress(){
            MapsService.getAddress(location).then(function (result) {
                vm.teacher.formattedAddress = result;
            });
        }

        function saveTeacher(){
            TeacherService.saveTeacher(vm.teacher).then(function(teacher){
                // TODO: Is this ok?
                vm.teacher = teacher;
            });
        }
    }
})();