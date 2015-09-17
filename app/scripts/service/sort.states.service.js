(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('SortStatesService', SortStatesService);

    function SortStatesService() {

        var ASCENDING = 'ASC';
        var DESCENDING = 'DESC';

        var all = [undefined, ASCENDING, DESCENDING];

        function next(state) {
            for (var i = 0; i < all.length; i++) {
                if (all[i] === state) {
                    return all[(i + 1) % all.length];
                }
            }

            return undefined;
        }

        return {
            all: all,
            next: next,
            ASCENDING: ASCENDING,
            DESCENDING: DESCENDING,
            UNDEFINED: undefined
        };
    }
})();