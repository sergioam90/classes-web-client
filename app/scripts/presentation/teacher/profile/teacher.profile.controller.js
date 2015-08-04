(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeacherProfileController', TeacherProfileController);

    TeacherProfileController.$inject = [
        'TeacherService',
        'StudentService',
        'AccountService',
        '$stateParams',
        '$modal'
    ];

    function TeacherProfileController(TeacherService, StudentService, AccountService, $stateParams, $modal) {

        var vm = this;

        vm.teacher = {};
        vm.relatedTeachers = [];
        vm.currentUser = AccountService.me;
        vm.toggleFavorite = toggleFavorite;
        vm.submitReview = submitReview;
        vm.showReviewModal = showReviewModal;

        initialize();

        /* Implementation */

        function initialize() {
            loadTeacher($stateParams.id);
        }

        function loadTeacher(id) {
            TeacherService.getById(id).then(function (teacher) {
                vm.teacher = teacher;

                // TODO: Ask to send empty object if student didn't make a review
                if (!vm.teacher.review) {
                    vm.teacher.review = {};
                }

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
            TeacherService.reviews(id).then(function (reviews) {
                vm.reviews = reviews;
            });
        }

        function toggleFavorite(teacher) {
            StudentService.toggleFavorite(teacher).then(function () {
                loadTeacher(vm.teacher.id);
            });
        }

        function submitReview(review) {
            TeacherService.submitReview(vm.teacher.id, review).then(function () {

                loadTeacher(vm.teacher.id);
            });
        }

        function showReviewModal() {
            $modal.open({
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