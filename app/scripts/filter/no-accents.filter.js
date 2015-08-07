(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('noAccents', NoAccentsFilter);

    function NoAccentsFilter() {

        function removeAccents(value) {
            return value
                .replace(/á/g, 'a')
                .replace(/é/g, 'e')
                .replace(/í/g, 'i')
                .replace(/ó/g, 'o')
                .replace(/ú/g, 'u')
                .replace(/ü/g, 'u');
        }

        return function (text) {
            return removeAccents(text);
        };
    }
})();