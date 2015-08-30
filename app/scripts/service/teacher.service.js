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
        vm.saveTeacher = saveTeacher;
        vm.search = search;
        vm.signupTeacher = signupTeacher;


        /* Implementation */

        function me() {
            return Teachers.one('me').get();
        }

        function signupTeacher(teacher) {
            return Teachers.post(teacher);
        }

        function reviews(id) {
            return Teachers.one(id).one('reviews').get();
        }

        function relatedTeachers(id) {
            return Teachers.one(id).one('related-teachers').getList();
        }

        function getById(id) {
            return Teachers.one(id).get();
        }

        function submitReview(teacherId, review) {
            return Teachers.one(teacherId).all('reviews').post(review);
        }

        function saveTeacher(teacher) {
            return Teachers.one('me').customPUT(teacher);
        }

        function search(searchCriteria) {
            return Teachers.one('').get(searchCriteria);
        }

    }

})();
