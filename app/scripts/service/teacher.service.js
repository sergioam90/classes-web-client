(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('TeacherService', TeacherService);

    TeacherService.$inject = ['Teachers'];

    function TeacherService(Teachers) {

        var vm = this;

        vm.me = me;
        vm.reviews = reviews;
        vm.relatedTeachers = relatedTeachers;
        vm.getById = getById;
        vm.submitReview = submitReview;


        /* Implementation */

        function me() {
            return Teachers.one('me').get();
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
