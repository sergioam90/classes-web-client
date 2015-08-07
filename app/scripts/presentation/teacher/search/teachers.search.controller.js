(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = ['TeacherService', 'Subjects', '$location'];

    function TeachersSearchController(TeacherService, Subjects, $location) {
        var vm = this;

        vm.subjects = [];
        vm.teachersResult = [];
        vm.search = search;

        var paramSearch = $location.search();
        vm.searchCriteria = paramSearch ? paramSearch : {};

        vm.selectedSubjects = vm.searchCriteria.subjects;

        initialize();

        /* Implementation */

        function initialize() {
            getSubjects();

            search();
        }

        function getSubjects() {
            Subjects.getList().then(function (subjects) {
                vm.subjects = subjects.plain();

                if (vm.selectedSubjects) {
                    angular.forEach(vm.subjects, function (value) {
                        value.selected = vm.selectedSubjects.indexOf(value.id) > -1;
                    });
                }
            });
        }

        function search() {
            var searchCriteria = vm.searchCriteria;

            // Add subjects ids to search criteria
            searchCriteria.subjects = [];
            angular.forEach(vm.subjects, function (value) {
                if (value.selected) {
                    searchCriteria.subjects.push(value.id);
                }
            });

            TeacherService.search(searchCriteria).then(function (page) {

                // TODO: Work with full page object
                vm.teachersResult = page.content;
            });
        }
    }

})();
