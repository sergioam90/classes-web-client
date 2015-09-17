(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(AppConfig);

    AppConfig.$inject = ['$provide'];

    function AppConfig($provide) {
        $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
            return function (exception, cause) {
                var $rootScope = $injector.get('$rootScope');
                alert('Exception\n' + exception + '\n' + cause);
                $delegate(exception, cause);
            };
        });
    }
})();