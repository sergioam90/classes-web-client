(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = ['Teachers', 'Subjects'];

    function TeachersSearchController(Teachers, Subjects) {
        var vm = this;
        vm.teachers = [];
        vm.subjects = [];

        // TODO: How should I write this?
        Teachers.getList().then(function (teachers) {
            vm.teachers = teachers;
        });

        // TODO: How should I write this?
        Subjects.getList().then(function (subjects) {
            vm.subjects = subjects;
        });

    }

})();
