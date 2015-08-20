(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = [
        'TeacherService',
        'Subjects',
        'DegreeService',
        'CityService',
        '$location',
        '$state',
        '$filter',
        '$timeout'
    ];

    function TeachersSearchController(TeacherService, Subjects, DegreeService, CityService, $location, $state, $filter, $timeout) {
        var vm = this;

        vm.defaultSearchCriteria = {
            fee: 400,
            city: null,
            subjects: [],
            degrees: []
        };

        vm.degreesNames = [];
        vm.selectedDegrees = [];

        vm.cities = CityService.getAllCities();

        vm.search = search;

        vm.moneyTranslate = moneyTranslate;
        vm.clearFilters = clearFilters;

        vm.teachersResult = [];
        vm.viewProfile = viewProfile;

        vm.subjects = [];
        vm.selectedSubjects = [];
        vm.subjectSelect = subjectSelect;
        vm.subjectUnselect = subjectUnselect;
        vm.subjectCheckboxChange = subjectCheckboxChange;
        vm.removeAccents = removeAccents;

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
                vm.selectedSubjects = [];
                if (vm.searchCriteria.subjects) {
                    for (var i = 0; i < vm.subjects.length; i++) {
                        var isSelected = vm.searchCriteria.subjects.indexOf(vm.subjects[i].id) > -1;

                        vm.subjects[i].selected = isSelected;

                        if (isSelected) {
                            vm.selectedSubjects.push(vm.subjects[i]);
                        }
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
            for (var i = 0; i < vm.selectedSubjects.length; i++) {
                searchCriteria.subjects.push(vm.selectedSubjects[i].id);
            }

            // TODO: Update url with searchCriteria
            $location.search(searchCriteria);

            TeacherService.search(searchCriteria).then(function (page) {

                // TODO: Work with full page object
                vm.teachersResult = page.content;
            });
        }

        function viewProfile(teacher) {
            $state.go('root.teacherProfile', teacher);
        }

        function moneyTranslate(value) {
            return '$ ' + value;
        }

        function clearFilters() {

            loadDefaultValues();

            vm.selectedSubjects = [];

            for (var i = 0; i < vm.subjects.length; i++) {
                vm.subjects[i].selected = false;
            }

            vm.search();
        }

        function subjectSelect(item, model) {
            item.selected = true;
            vm.search();
        }

        function subjectUnselect(item, model) {
            item.selected = false;
            vm.search();
        }

        function subjectCheckboxChange(subject) {

            if (subject.selected) {
                vm.selectedSubjects.push(subject);

                vm.search();
            } else {
                var i = vm.selectedSubjects.indexOf(subject);
                vm.selectedSubjects.splice(i, 1);

                vm.search();
            }
        }

        function removeAccents(textWithAccents, substring) {
            if (typeof textWithAccents === 'boolean') {
                return true;
            }

            var textWithoutAccents = $filter('noAccents')(textWithAccents);

            return textWithoutAccents.toLowerCase().indexOf(substring.toLowerCase()) > -1;
        }

    }

})();
