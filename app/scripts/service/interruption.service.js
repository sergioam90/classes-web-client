(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('InterruptionService', InterruptionService);

    InterruptionService.$inject = ['CookiesService', '$location'];

    function InterruptionService(CookiesService, $location) {

        var BEFORE_INTERRUPTION_URL = 'before-interruption-url';

        function interrupt() {
            CookiesService.put(BEFORE_INTERRUPTION_URL, $location.url());
        }

        function restore() {
            var beforeInterruptionUrl = CookiesService.get(BEFORE_INTERRUPTION_URL);

            // TODO: remove url?

            $location.url(beforeInterruptionUrl);
        }

        return {
            interrupt: interrupt,
            restore: restore
        };
    }
})();