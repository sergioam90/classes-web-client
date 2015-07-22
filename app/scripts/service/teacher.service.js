(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('TeacherService', TeacherService);

    TeacherService.$inject = ['Teachers', 'AccountService'];

    function TeacherService(Teachers, AccountService) {

        var vm = this;

        vm.me = me;
        vm.reviews = reviews;
        vm.relatedTeachers = relatedTeachers;
        vm.getById = getById;
        vm.submitReview = submitReview;


        /* Implementation */

        function me() {
            // TODO: Update call to 'me'
            return Teachers.one(AccountService.me.teacher).get();
        }

        function reviews(id){
            return Teachers.one(id).one('reviews').getList();
        }

        function relatedTeachers(id){
            return Teachers.one(id).one('related-teachers').getList();
        }

        function getById(id){
            return Teachers.one(id).get();
        }

        function submitReview(teacherId, review){
            return Teachers.one(teacherId).all('reviews').post(review);
        }

    }

})();
