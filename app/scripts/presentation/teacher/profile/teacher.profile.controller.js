(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeacherProfileController', TeacherProfileController);

    TeacherProfileController.$inject = [
        'TeacherService',
        'StudentService',
        'AccountService',
        'teacher',
        'ModalService'
    ];

    function TeacherProfileController(TeacherService, StudentService, AccountService, teacher, ModalService) {

        var vm = this;

        vm.teacher = teacher;
        vm.relatedTeachers = [];
        vm.currentUser = {};
        vm.toggleFavorite = toggleFavorite;
        vm.submitReview = submitReview;
        vm.showReviewModal = showReviewModal;
        vm.removeReview = removeReview;

        initialize();

        /* Implementation */

        function initialize() {
            loadCurrentUser();
            loadRelatedTeachers(vm.teacher.id);
            loadReviews(vm.teacher.id);
        }

        function loadCurrentUser() {
            AccountService.loadUser().then(function (user) {
                vm.currentUser = user;
            });
        }

        function loadTeacher(id) {
            TeacherService.getById(id).then(function (teacher) {
                vm.teacher = teacher;

                loadRelatedTeachers(vm.teacher.id);
                loadReviews(vm.teacher.id);
            });
        }

        function loadRelatedTeachers(id) {
            TeacherService.relatedTeachers(id).then(function (relatedTeachers) {
                vm.relatedTeachers = relatedTeachers;
            });
        }

        function loadReviews(id) {
            TeacherService.reviews(id).then(function (page) {
                // TODO: Work with pages not just content
                vm.reviews = page.content;
            });
        }

        function toggleFavorite(teacher) {
            StudentService.toggleFavorite(teacher).then(function () {
                loadTeacher(vm.teacher.id);
            });
        }

        function removeReview(teacherId) {
            StudentService.removeReview(teacherId).then(function () {
                loadReviews(vm.teacher.id);

                loadTeacher(vm.teacher.id);
            });
        }

        function submitReview(review) {
            return TeacherService.
                submitReview(vm.teacher.id, review).then(function () {

                    loadTeacher(vm.teacher.id);
                });
        }

        function showReviewModal() {

            ModalService.open({
                templateUrl: 'scripts/presentation/teacher/profile/review/teacher.profile.review.html',
                controller: 'ReviewModalController',
                controllerAs: 'vm',
                resolve: {
                    teacher: function () {
                        return vm.teacher;
                    },
                    currentUser: function () {
                        return vm.currentUser;
                    },
                    submitReview: function () {
                        return vm.submitReview;
                    }
                }
            });
        }
    }

})();
