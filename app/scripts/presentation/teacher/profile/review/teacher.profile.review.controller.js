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
        vm.onHover = onHover;
        vm.onLeave = onLeave;

        vm.titles = [
            'Malísimo',
            'Malo',
            'Zafa',
            'Bueno',
            'Genial'
        ];

        vm.currentTitle = vm.titles[vm.teacher.review.rating - 1];

        function modalSubmitReview(review) {
            submitReview(review);
            $modalInstance.close();
        }

        function modalDismiss() {
            $modalInstance.close();
        }

        function onHover(value) {
            vm.currentTitle = vm.titles[value - 1];
        }

        function onLeave() {
            vm.currentTitle = vm.titles[vm.teacher.review.rating - 1];
        }

    }
})();