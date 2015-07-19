(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('StudentService', StudentService);

    StudentService.$inject = ['Students', 'AccountService'];

    function StudentService(Students, AccountService) {

        var vm = this;

        vm.me = me;
        vm.madeReviews = madeReviews;


        /* Implementation */

        function me() {
            // TODO: Update call to 'me'
            return Students.one(AccountService.me.student).get();
        }

        function madeReviews(id){
            return Students.one(id).one('made-reviews').getList();
        }
    }

})();
