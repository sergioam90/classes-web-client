(function() {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('TitleService', TitleService);

    TitleService.$inject = ['appName'];

    function TitleService(appName) {

        var currentTitle = null;

        function getCurrentTitle() {
            return currentTitle;
        }

        function setCurrentTitle(title) {
            if (title.length > 0) {
                title += ' - ';
            }

            currentTitle = title + appName;
        }

        return {
            getCurrentTitle: getCurrentTitle,
            setCurrentTitle: setCurrentTitle
        };
    }
})();
