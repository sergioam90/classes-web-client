(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeacherProfileController', TeacherProfileController);

    TeacherProfileController.$inject = ['TeacherService', 'StudentService', 'AccountService', '$stateParams'];

    function TeacherProfileController(TeacherService, StudentService, AccountService, $stateParams){

        var vm = this;

        vm.teacher = {};
        vm.relatedTeachers = [];
        vm.currentUser = AccountService.me;
        vm.addAsFavorite = addAsFavorite;
        vm.submitReview = submitReview;

        initialize();

        /* Implementation */

        function initialize(){
            loadTeacher($stateParams.id);
        }

        function loadTeacher(id){
            TeacherService.getById(id).then(function (teacher) {
                vm.teacher = teacher;

                loadRelatedTeachers(vm.teacher.id);
                loadReviews(vm.teacher.id);
            });
        }

        function loadRelatedTeachers(id) {
            TeacherService.relatedTeachers(id).then(function(relatedTeachers){
                vm.relatedTeachers = relatedTeachers;
            });
        }

        function loadReviews(id){
            TeacherService.reviews(id).then(function(reviews){
                vm.reviews = reviews;
            });
        }

        function addAsFavorite(teacher){
            // TODO: Make this toggle not only add
            StudentService.addAsFavorite(teacher);
        }

        function submitReview(review){
            TeacherService.submitReview(vm.teacher.id, review).then(function(){
                loadReviews(vm.teacher.id); // TODO: Will this update view?
            });
        }
    }

})();