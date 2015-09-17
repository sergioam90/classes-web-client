(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('LevelService', LevelService);

    function LevelService() {
        var levelsNames = {
            secondary: 'Secundario',
            university: 'Universitario',
            tertiary: 'Terciario',
            primary: 'Primario',
            beginner: 'Básico',
            intermediate: 'Intermedio',
            advanced: 'Avanzado'
        };

        function getAllLevels() {
            var keys = [];

            for (var key in levelsNames) {
                if (levelsNames.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            return keys;
        }

        function getLevelName(level) {
            return levelsNames[level];
        }

        return {
            getAllLevels: getAllLevels,
            getLevelName: getLevelName
        };
    }

})();