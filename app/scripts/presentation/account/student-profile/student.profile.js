(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('StudentProfileController', StudentProfileController);

    StudentProfileController.$inject = ['StudentService'];

    function StudentProfileController(StudentService){

        var vm = this;

        vm.student = {};
        vm.madeReviews = {};

        initialize();

        /* Implementation */

        function initialize(){
            loadStudentData();
        }

        function loadStudentData(){

            StudentService.me().then(callback);

            function callback(student) {
                vm.student = student;

                loadStudentReviews(vm.student.id);
            }
        }

        function loadStudentReviews(id) {
            StudentService.madeReviews(id).then(function(madeReviews){
                vm.madeReviews = madeReviews;
            });
        }
    }
})();