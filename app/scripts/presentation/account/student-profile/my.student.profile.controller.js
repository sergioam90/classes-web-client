(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyStudentProfileController', MyStudentProfileController);

    MyStudentProfileController.$inject = ['student', 'StudentService', 'UserService'];

    function MyStudentProfileController(student, StudentService, UserService) {

        var vm = this;

        vm.student = student;
        vm.madeReviews = [];
        vm.favoriteTeachers = [];

        vm.removeReview = removeReview;

        // Edit functions
        vm.editUser = editUser;

        initialize();

        /* Implementation */

        function initialize() {
            if (vm.student) {
                loadStudentData();
            }
        }

        function loadStudentData() {

            StudentService.me().then(success, error);

            function success(student) {
                vm.student = student;

                loadStudentReviews(vm.student.id);
                loadStudentFavoriteTeachers();
            }

            function error() {
                vm.student = undefined;
            }
        }

        function loadStudentReviews(id) {
            StudentService.madeReviews(id).then(function (page) {
                // TODO: Work with pages not just content
                vm.madeReviews = page.content;
            });
        }

        function loadStudentFavoriteTeachers() {
            StudentService.favoriteTeachers().then(function (page) {
                // TODO: Work with pages not just content
                vm.favoriteTeachers = page.content;
            });
        }

        function removeReview(teacher) {
            StudentService.removeReview(teacher).then(function () {
                loadStudentReviews(vm.student.id);
            });
        }

        function editUser() {
            UserService.editUser(vm.student.user);
        }
    }
})();