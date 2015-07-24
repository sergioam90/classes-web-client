(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MainController', MainController);

    MainController.$inject = ['Subjects', 'LevelService', 'CityService'];

    function MainController(Subjects, LevelService, CityService) {
        var vm = this;

        vm.subjects = [];
        vm.levels = LevelService.getAllLevels();
        vm.cities = CityService.getAllCities();

        Subjects.getList().then(function (subjects) {
            vm.subjects = subjects.plain();
        });
    }

})();
