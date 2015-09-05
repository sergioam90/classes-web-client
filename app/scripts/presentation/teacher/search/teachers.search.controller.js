(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('TeachersSearchController', TeachersSearchController);

    TeachersSearchController.$inject = [
        'user',
        'student',
        'TeacherService',
        'Subjects',
        'DegreeService',
        'CityService',
        '$location',
        '$state',
        '$filter',
        '$timeout'
    ];

    function TeachersSearchController(user, student, TeacherService, Subjects, DegreeService, CityService, $location, $state, $filter, $timeout) {
        var vm = this;

        vm.user = user;
        vm.student = student;

        vm.defaultSearchCriteria = {
            fee: 400,
            city: null,
            subjects: [],
            degrees: []
        };

        vm.searching = true;

        vm.degreesNames = [];
        vm.selectedDegrees = [];

        vm.subjects = [];

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
            loadSearchParams().then(vm.search);
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

        function loadSearchParams() {
            loadDefaultValues();

            // Load query string params
            var searchParams = angular.copy($location.search());

            // This case is for a single subject taken as a string not as an array
            if (searchParams.subjects && !angular.isArray(searchParams.subjects)) {
                searchParams.subjects = [searchParams.subjects];
            }

            angular.extend(vm.searchCriteria, searchParams);

            var waitForSubjects = loadSubjects();

            return waitForSubjects;
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
                for (var i = 0; i < vm.subjects.length; i++) {
                    if (vm.searchCriteria.subjects) {
                        var index = vm.searchCriteria.subjects.indexOf(vm.subjects[i].id);

                        vm.subjects[i].selected = index > -1;

                        // TODO: Dirty fix
                        if (index > -1) {
                            vm.searchCriteria.subjects[index] = vm.subjects[i];
                        }
                    }
                }

            });
        }

        function search() {
            console.log('search');
            var searchCriteria = angular.copy(vm.searchCriteria);

            // Add degrees to search criteria
            searchCriteria.degrees = [];
            for (var i = 0; i < vm.selectedDegrees.length; i++) {
                if (vm.selectedDegrees[i]) {
                    searchCriteria.degrees.push(vm.degreesNames[i]);
                }
            }

            // Add subjects ids to search criteria
            searchCriteria.subjects = [];

            for (var i = 0; i < vm.searchCriteria.subjects.length; i++) {
                searchCriteria.subjects.push(vm.searchCriteria.subjects[i].id);
            }

            $location.search(searchCriteria);

            vm.searching = true;

            TeacherService.search(searchCriteria).then(function (page) {

                vm.searching = false;
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
