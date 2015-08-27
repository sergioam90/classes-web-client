(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('modal2', ModalDirective);

    ModalDirective.$inject = ['$compile', '$controller', '$injector', '$q', '$templateRequest', 'ModalService'];

    function ModalDirective($compile, $controller, $injector, $q, $templateRequest, ModalService) {

        var options = null;

        function close() {
            ModalService.close();
        }

        function getDependencies() {
            var resolve = options.resolve;

            var promises = {};
            if (angular.isDefined(resolve)) {
                for (var key in resolve) {
                    if (!resolve.hasOwnProperty(key)) {
                        continue;
                    }

                    var value = resolve[key];

                    var dependency;
                    if (angular.isString(value)) {
                        dependency = $injector.get(value);
                    } else {
                        dependency = $injector.invoke(value);
                    }

                    promises[key] = $q.when(dependency);
                }
            }

            return promises;
        }

        function link(scope, element) {
            options = ModalService.getOptions();

            var controller = options.controller;
            var controllerAs = options.controllerAs;

            if (angular.isDefined(controller)) {
                $q.all(getDependencies()).then(function (dependencies) {
                    dependencies.$scope = scope;

                    var instance = $controller(controller, dependencies);

                    if (angular.isDefined(controllerAs)) {
                        scope[controllerAs] = instance;
                    }

                    open(scope, element);
                });
            } else {
                open(scope, element);
            }
        }

        function open(scope, element) {
            var template = options.template;
            var templateUrl = options.templateUrl;

            if (angular.isUndefined(template)) {
                template = $templateRequest(templateUrl);
            }

            $q.when(template).then(function (template) {
                var html = $compile(template)(scope);
                element.append(html);

                html.openModal({
                    complete: close
                });
            });
        }

        return {
            restrict: 'E',
            scope: {},
            link: link
        };
    }

})();