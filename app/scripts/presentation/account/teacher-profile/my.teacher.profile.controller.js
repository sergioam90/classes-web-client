(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyTeacherProfileController', MyTeacherProfileController);

    MyTeacherProfileController.$inject = ['TeacherService', 'MapsService'];

    function MyTeacherProfileController(TeacherService, MapsService) {

        var vm = this;

        vm.teacher = {};
        vm.reviews = [];

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
    }
})();