(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .run(Run);

    Run.$inject = ['$rootScope'];

    function Run($rootScope) {

        // Watch for state change to home to apply custom styles
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.isHome = toState.name === 'root.home';
        });
    }

})();
