(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(RestangularConfig);

    RestangularConfig.$inject = ['RestangularProvider', 'appConfig'];

    function RestangularConfig(RestangularProvider, appConfig) {
        RestangularProvider.setBaseUrl('http://' + appConfig.SERVER_URL);
    }

})();
