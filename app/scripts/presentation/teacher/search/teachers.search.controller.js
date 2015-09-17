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

        vm.localSelectStrings = {
            selectAll: 'Todas',
            selectNone: 'Ninguna',
            reset: 'Reiniciar',
            search: 'Escribí aca para buscar...',
            nothingSelected: 'Ninguna materia seleccionada'
        };

        vm.degreesNames = [];
        vm.selectedDegrees = [];

        vm.subjects = [];

        // TODO: Decide how to implement binding with vm.subjects
        vm.singleSelectedSubject = {};

        vm.teachersResult = [];

        vm.cities = CityService.getAllCities();

        /** Functions **/
        vm.search = search;
        vm.moneyTranslate = moneyTranslate;
        vm.clearFilters = clearFilters;
        vm.viewProfile = viewProfile;
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
                vm.subjects = [];

                for (var i = 0; i < 100; i++) {
                    vm.subjects.push({name: 'test' + i, level: 'Secondary'});
                }

                // If there are subjects in url, set them as selected
                for (var i = 0; i < vm.subjects.length; i++) {

                    // TODO: This should be replaced when multiselect supports filters
                    var nameWithoutAccents = $filter('noAccents')(vm.subjects[i].name);
                    var filteredLevel = $filter('level')(vm.subjects[i].level);

                    vm.subjects[i].filteredName = nameWithoutAccents;
                    vm.subjects[i].filteredLevel = ' - ' + filteredLevel;

                    if (vm.searchCriteria.subjects) {
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

        function removeAccents(textWithAccents, substring) {
            if (typeof textWithAccents === 'boolean') {
                return true;
            }

            var textWithoutAccents = $filter('noAccents')(textWithAccents);

            return textWithoutAccents.toLowerCase().indexOf(substring.toLowerCase()) > -1;
        }


    }

})();
