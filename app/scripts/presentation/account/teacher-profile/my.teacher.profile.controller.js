(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyTeacherProfileController', MyTeacherProfileController);

    MyTeacherProfileController.$inject = ['TeacherService'];

    function MyTeacherProfileController(TeacherService) {

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
            });
        }

        function loadReviews(id){
            TeacherService.reviews(id).then(function(reviews){
                vm.reviews = reviews;
            });
        }


    }
})();