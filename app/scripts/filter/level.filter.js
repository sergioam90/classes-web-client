(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('level', LevelFilter);

    LevelFilter.$inject = ['LevelService'];

    function LevelFilter(LevelService) {
        return function (input) {
            input = input || '';

            return LevelService.getLevelName(input);
        };
    }
})();