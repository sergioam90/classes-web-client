(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .run(Run);

    Run.$inject = ['$rootScope'];

    function Run($rootScope) {

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        });
    }

})();
