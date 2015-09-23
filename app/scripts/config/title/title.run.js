(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .run(Run);

    Run.$inject = ['$rootScope', 'TitleService'];

    function Run($rootScope, TitleService) {
        $rootScope.$on('$stateChangeStart', function() {
            TitleService.setCurrentTitle('');
        });
    }
})();
