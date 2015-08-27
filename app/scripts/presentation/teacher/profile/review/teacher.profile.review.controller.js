(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('ReviewModalController', ReviewModalController);

    // Injection is made through resolve attribute
    ReviewModalController.$inject = ['ModalService', 'teacher', 'currentUser', 'submitReview'];

    function ReviewModalController(ModalService, teacher, currentUser, submitReview) {
        var vm = this;

        vm.teacher = teacher;
        vm.currentUser = currentUser;
        vm.review = {};
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

        if (vm.teacher.review) {
            vm.review.comment = vm.teacher.review.comment;
            vm.review.rating = vm.teacher.review.rating;

            // TODO: Make this a function
            vm.currentTitle = vm.titles[vm.teacher.review.rating - 1];
        }

        function modalSubmitReview() {
            console.log(vm.review);
            submitReview(vm.review).then(success, error);

            function success() {
                ModalService.close();
            }

            function error() {
                // TODO: Show error message
            }
        }

        function modalDismiss() {
            ModalService.close();
        }

        function onHover(value) {
            vm.currentTitle = vm.titles[value - 1];
        }

        function onLeave() {
            vm.currentTitle = vm.titles[vm.teacher.review.rating - 1];
        }

    }
})();