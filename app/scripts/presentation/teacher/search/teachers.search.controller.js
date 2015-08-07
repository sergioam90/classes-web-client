(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = ['TeacherService', 'Subjects', '$scope'];

    function TeachersSearchController(TeacherService, Subjects, $scope) {
        var vm = this;

        vm.subjects = [];
        vm.searchCriteria = {};
        vm.teachersResult = [];
        vm.search = search;

        initialize();

        /* Implementation */

        function initialize() {
            getSubjects();
            search();
        }

        function getSubjects() {
            Subjects.getList().then(function (subjects) {
                vm.subjects = subjects;
            });
        }

        function search() {
            TeacherService.search(vm.searchCriteria).then(function (page) {

                // TODO: Work with full page object
                vm.teachersResult = page.content;
            });
        }
    }

})();
