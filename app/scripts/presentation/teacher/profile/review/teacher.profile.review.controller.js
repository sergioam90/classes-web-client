(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('ReviewModalController', ReviewModalController);

    // Injection is made through resolve attribute
    ReviewModalController.$inject = ['$modalInstance', 'teacher', 'currentUser', 'submitReview'];

    function ReviewModalController($modalInstance, teacher, currentUser, submitReview) {
        var vm = this;

        vm.teacher = teacher;
        vm.currentUser = currentUser;
        vm.modalSubmitReview = modalSubmitReview;
        vm.modalDismiss = modalDismiss;

        function modalSubmitReview(review) {
            submitReview(review);
            $modalInstance.close();
        }

        function modalDismiss() {
            $modalInstance.close();
        }

    }
})();