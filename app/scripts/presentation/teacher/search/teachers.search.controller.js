(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = ['TeacherService', 'Subjects', 'DegreeService', 'CityService', '$location', '$state'];

    function TeachersSearchController(TeacherService, Subjects, DegreeService, CityService, $location, $state) {
        var vm = this;

        vm.defaultSearchCriteria = {
            fee: 400,
            city: null,
            subjects: [],
            degrees: []
        };

        vm.subjects = [];
        vm.degreesNames = [];
        vm.selectedDegrees = [];
        vm.cities = CityService.getAllCities();
        vm.teachersResult = [];

        vm.search = search;
        vm.viewProfile = viewProfile;
        vm.moneyTranslate = moneyTranslate;
        vm.clearFilters = clearFilters;

        initialize();

        /* Implementation */

        function initialize() {
            // We must wait for subject loading from URL
            loadSearchParams().then(search);
        }

        function loadSearchParams() {
            loadDefaultValues();

            var searchParams = $location.search();

            vm.searchCriteria = angular.extend({}, vm.defaultSearchCriteria, searchParams);

            var waitForSubjects = loadSubjects();

            return waitForSubjects;
        }

        function loadDefaultValues() {
            // Set default search values
            vm.searchCriteria = {};
            angular.copy(vm.defaultSearchCriteria, vm.searchCriteria);

            // Set default schedules
            vm.schedules = {};
            angular.copy(vm.defaultSchedules, vm.schedules);

            // Load default degree selection
            loadDegrees();
        }

        function loadDegrees() {
            vm.degreesNames = DegreeService.getAllDegrees();

            vm.selectedDegrees = new Array(vm.degreesNames.length);

            for (var i = 0; i < vm.degreesNames.length; i++) {
                vm.selectedDegrees[i] = true;
            }
        }

        function loadSubjects() {
            return Subjects.getList().then(function (subjects) {
                vm.subjects = subjects.plain();

                // If there are subjects in url, set them as selected
                if (vm.searchCriteria && vm.searchCriteria.subjects) {
                    for (var i = 0; i < vm.subjects.length; i++) {
                        vm.subjects[i].selected = vm.searchCriteria.subjects.indexOf(vm.subjects[i].id) > -1;
                    }
                }
            });
        }

        function search() {
            var searchCriteria = {};

            angular.copy(vm.searchCriteria, searchCriteria);

            // Add degrees to search criteria
            searchCriteria.degrees = [];
            for (var i = 0; i < vm.selectedDegrees.length; i++) {
                if (vm.selectedDegrees[i]) {
                    searchCriteria.degrees.push(vm.degreesNames[i]);
                }
            }

            // Add subjects ids to search criteria
            searchCriteria.subjects = [];
            for (var i = 0; i < vm.subjects.length; i++) {
                if (vm.subjects[i].selected) {
                    searchCriteria.subjects.push(vm.subjects[i].id);
                }
            }

            // TODO: Update url with searchCriteria
            $location.search(searchCriteria);

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

        function clearFilters() {

            loadDefaultValues();

            // TODO: Is this clean?
            for (var i = 0; i < vm.subjects.length; i++) {
                vm.subjects[i].selected = false;
            }
            vm.search();
        }
    }

})();
