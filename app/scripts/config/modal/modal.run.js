(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .run(Run);

    Run.$inject = ['$rootScope', 'ModalService'];

    function Run($rootScope, ModalService) {
        $rootScope.$on('$stateChangeSuccess', function () {
            ModalService.close();
        });
    }
})();
