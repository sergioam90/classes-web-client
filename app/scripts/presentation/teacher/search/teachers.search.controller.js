(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = ['TeacherService', 'Subjects', 'DegreeService', 'CityService', '$location', '$state'];

    function TeachersSearchController(TeacherService, Subjects, DegreeService, CityService, $location, $state) {
        var vm = this;

        vm.subjects = [];
        vm.degrees = [];
        vm.cities = CityService.getAllCities();

        vm.teachersResult = [];
        vm.search = search;

        vm.viewProfile = viewProfile;

        var paramSearch = $location.search();
        vm.searchCriteria = paramSearch ? paramSearch : {};

        vm.moneyTranslate = moneyTranslate;

        initialize();

        /* Implementation */

        function initialize() {
            loadSubjects();

            loadDegrees();

            search();
        }

        function loadDegrees() {
            vm.degrees = [];

            angular.forEach(DegreeService.getAllDegrees(), function (value) {
                vm.degrees.push({name: value});
            });
        }

        function loadSubjects() {
            Subjects.getList().then(function (subjects) {
                vm.subjects = subjects.plain();

                // If there are subjects in url, set them as selected
                if (vm.searchCriteria && vm.searchCriteria.subjects) {
                    angular.forEach(vm.subjects, function (value) {
                        value.selected = vm.searchCriteria.subjects.indexOf(value.id) > -1;
                    });
                }
            });
        }

        function search() {
            var searchCriteria = vm.searchCriteria;

            // Add degrees to search criteria
            searchCriteria.degrees = [];
            angular.forEach(vm.degrees, function (value) {
                if (value.selected) {
                    searchCriteria.degrees.push(value.name);
                }
            });

            // Add subjects ids to search criteria
            searchCriteria.subjects = [];
            angular.forEach(vm.subjects, function (value) {
                if (value.selected) {
                    searchCriteria.subjects.push(value.id);
                }
            });

            // TODO: Update url with searchCriteria

            TeacherService.search(searchCriteria).then(function (page) {

                // TODO: Work with full page object
                vm.teachersResult = page.content;
            });
        }

        function viewProfile(teacher) {
            $state.go('teacherProfile', teacher);
        }

        function moneyTranslate(value) {
            return '$ ' + value;
        }

    }

})();
