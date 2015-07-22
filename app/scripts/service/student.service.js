(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('StudentService', StudentService);

    StudentService.$inject = ['Students', 'Teachers'];

    function StudentService(Students, Teachers) {

        var vm = this;

        vm.me = me;
        vm.madeReviews = madeReviews;
        vm.favoriteTeachers = favoriteTeachers;
        vm.addAsFavorite = addAsFavorite;
        vm.removeFavoriteTeacher = removeFavoriteTeacher;
        vm.removeReview = removeReview;


        /* Implementation */

        function me() {
            // TODO: Update call to 'me'
            return Students.one('me').get();
        }

        function madeReviews(id) {
            return Students.one(id).one('made-reviews').getList();
        }

        function favoriteTeachers() {
            return Students.one('me').one('favorite-teachers').getList();
        }

        function addAsFavorite(teacher) {
            return Students.one('me').all('favorite-teachers').post({id: teacher.id});
        }

        function removeFavoriteTeacher(teacherId){
            return Students.one('me').all('favorite-teachers').one(teacherId).remove();
        }

        function removeReview(teacherId){
            return Teachers.one(teacherId).one('reviews').remove();
        }
    }

})();
