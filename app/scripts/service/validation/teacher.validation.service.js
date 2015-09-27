(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .provider('teacherValidation', TeacherValidationProvider);

    TeacherValidationProvider.$inject = [];

    function TeacherValidationProvider() {

        var validationConstraints = {
            Teacher: {
                degree: {
                    required: {
                        message: 'teacher.degree.required'
                    }
                },
                location: {
                    required: {
                        message: 'teacher.location.required'
                    },
                    city: {
                        message: 'teacher.location.invalidCity'
                    }
                },
                fee: {
                    min: {
                        value: 20,
                        message: 'teacher.fee.low'
                    },
                    max: {
                        value: 400,
                        message: 'teacher.fee.high'
                    },
                    required: {
                        message: 'teacher.fee.required'
                    }
                },
                phone: {
                    size: {
                        max: 32,
                        message: 'teacher.phone.long'
                    },
                    required: {
                        message: 'teacher.phone.required'
                    }
                },
                description: {
                    size: {
                        max: 512,
                        message: 'teacher.description.long'
                    },
                    required: {
                        message: 'teacher.description.required'
                    }
                },
                schedule: {
                    required: {
                        message: 'teacher.schedule.required'
                    }
                },
                audience: {
                    required: {
                        message: 'teacher.audience.required'
                    }
                }
            }
        };

        this.getValidationConstraints = function () {
            return validationConstraints;
        };

        this.$get = function () {
            return new TeacherValidationProvider();
        };
    }

})();
