(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = ['Teachers', '$location', 'Subjects'];

    function TeachersSearchController(Teachers, $location, Subjects) {
        var vm = this;
        vm.teachers = [];

        vm.redirect = redirect;

        // TODO: How should I write this?
        Teachers.getList().then(function (teachers) {
            vm.teachers = teachers;
        });

        // TODO: How should I write this?
        Subjects.getList().then(function (subjects) {
            vm.subjects = subjects;
        });

        //////////////

        function redirect(id) {
            $location.path('/teachers/' + id);
        }
    }

})();
