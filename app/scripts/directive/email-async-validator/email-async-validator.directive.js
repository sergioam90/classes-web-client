(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('emailAsyncValidator', EmailAsyncValidatorDirective);

    EmailAsyncValidatorDirective.$inject = ['UserService', '$q'];

    function EmailAsyncValidatorDirective(UserService, $q) {

        function link(scope, element, attrs, ctrl) {
            ctrl.$asyncValidators.email = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    // Consider empty as valid
                    return $q.when();
                }

                var deferred = $q.defer();

                UserService.exists(modelValue).then(function (result) {
                    if (result) {
                        // Reject (invalid) if mail exists
                        deferred.reject();
                    } else {
                        // Resolve (valid) if mail does not exist
                        deferred.resolve();
                    }
                });

                return deferred.promise;
            };
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }
})();