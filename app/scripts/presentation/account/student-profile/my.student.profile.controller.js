(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MyStudentProfileController', MyStudentProfileController);

    MyStudentProfileController.$inject = ['StudentService', 'UserService'];

    function MyStudentProfileController(StudentService, UserService) {

        var vm = this;

        vm.student = {};
        vm.madeReviews = [];
        vm.favoriteTeachers = [];

        vm.removeReview = removeReview;

        // Edit functions
        vm.editUser = editUser;


        initialize();

        /* Implementation */

        function initialize() {
            loadStudentData();
        }

        function loadStudentData() {

            StudentService.me().then(callback);

            function callback(student) {
                vm.student = student;

                loadStudentReviews(vm.student.id);
                loadStudentFavoriteTeachers();
            }
        }

        function loadStudentReviews(id) {
            StudentService.madeReviews(id).then(function (madeReviews) {
                vm.madeReviews = madeReviews;
            });
        }

        function loadStudentFavoriteTeachers() {
            StudentService.favoriteTeachers().then(function (favoriteTeachers) {
                vm.favoriteTeachers = favoriteTeachers;
            });
        }

        function removeReview(teacherId) {
            StudentService.removeReview(teacherId).then(function () {
                loadStudentReviews(vm.student.id);
            });
        }

        function editUser() {
            UserService.editUser(vm.student.user);
        }
    }
})();