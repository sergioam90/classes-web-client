(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('LevelService', LevelService);

    function LevelService(){
        var levelsNames = {
            Secondary: 'Secundario',
            University: 'Universitario'
        };

        function getAllLevels(){
            var keys = [];

            for (var key in levelsNames) {
                if (levelsNames.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            return keys;
        }

        function getLevelName(level){
            return levelsNames[level];
        }

        return {
            getAllLevels: getAllLevels,
            getLevelName: getLevelName
        };
    }

})();