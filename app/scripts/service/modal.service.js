(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('ModalService', ModalService);

    ModalService.$inject = ['$compile', '$document', '$rootScope'];

    function ModalService($compile, $document, $rootScope) {

        var modal = null;

        function close() {
            if (modal === null) {
                return;
            }

            modal.scope.$destroy();
            modal.element.remove();

            modal = null;
        }

        function getOptions() {
            return modal.options;
        }

        function open(options) {
            if (modal !== null) {
                return;
            }

            modal = {
                options: options
            };

            var scope = $rootScope.$new(true);
            var element = $compile('<modal2></modal2>')(scope);
            $document.find('body').append(element);

            modal.element = element;
            modal.scope = scope;
        }

        return {
            close: close,
            getOptions: getOptions,
            open: open
        };
    }

})();