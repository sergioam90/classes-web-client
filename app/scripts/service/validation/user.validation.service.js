(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .provider('userValidation', UserValidationProvider);

    UserValidationProvider.$inject = [];

    function UserValidationProvider() {

        var emailPattern = /(?!.*\\p{Cntrl})(?!.* )(?!.*@.*@)(?=.{0,254}$)^.+@.+$/;
        var passwordPattern = /(?=.*[0-9])(?=.*[A-Za-z])^.{8,}$/;

        var validationConstraints = {
            User: {
                email: {
                    pattern: {
                        value: emailPattern,
                        message: 'user.email.invalid'
                    },
                    required: {
                        message: 'user.email.required'
                    }
                },
                password: {
                    pattern: {
                        value: passwordPattern,
                        message: 'user.password.invalid'
                    },
                    required: {
                        message: 'user.password.required'
                    }
                },
                firstName: {
                    size: {
                        min: 1,
                        max: 48,
                        message: 'user.firstName.size'
                    },
                    required: {
                        message: 'user.firstName.required'
                    }
                },
                lastName: {
                    size: {
                        min: 1,
                        max: 48,
                        message: 'user.lastName.size'
                    },
                    required: {
                        message: 'user.lastName.required'
                    }
                },
                gender: {
                    required: {
                        message: 'user.gender.required'
                    }
                },
                birthDate: {
                    // TODO: Add date validator
                    required: {
                        message: 'user.birthDate.required'
                    }
                }
            }
        };

        this.getValidationConstraints = function () {
            return validationConstraints;
        };

        this.$get = function () {
            return new UserValidationProvider();
        };
    }

})();
