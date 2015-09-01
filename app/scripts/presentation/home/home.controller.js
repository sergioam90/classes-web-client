(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Subjects', 'LevelService', 'CityService', '$filter', '$state', '$document'];

    function HomeController(Subjects, LevelService, CityService, $filter, $state, $document) {
        var vm = this;

        vm.subjects = [];
        vm.levels = LevelService.getAllLevels();
        vm.cities = CityService.getAllCities();
        vm.removeAccents = removeAccents;
        vm.homeSearch = homeSearch;
        vm.searchCriteria = {};

        initialize();

        /* Implementation */

        function initialize() {
            Subjects.getList().then(function (subjects) {
                vm.subjects = subjects.plain();
            });
        }

        function removeAccents(textWithAccents, substring) {
            var textWithoutAccents = $filter('noAccents')(textWithAccents);

            return textWithoutAccents.toLowerCase().indexOf(substring.toLowerCase()) > -1;
        }

        function homeSearch() {
            var searchCriteria = {};

            searchCriteria.city = vm.searchCriteria.city;

            if (vm.searchCriteria.subject) {
                searchCriteria.subjects = vm.searchCriteria.subject.id;
            }

            $state.go('root.teachersSearch', searchCriteria);
        }
    }

})();
