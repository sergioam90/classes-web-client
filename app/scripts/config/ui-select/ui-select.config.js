(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(UiSelectConfig);

    UiSelectConfig.$inject = ['uiSelectConfig'];

    function UiSelectConfig(uiSelectConfig) {
        uiSelectConfig.theme = 'select2';
    }
})();