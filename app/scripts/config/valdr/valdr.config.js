(function () {
    'use strict';

    angular.module('classesClientApp')
        .value('valdrClasses', {
            // added on all elements with valdr-form-group directive
            formGroup: 'form-group',
            // added on valdr-form-group and on valdr-messages if all of the form items are valid
            valid: 'ng-valid valid',
            // added on valdr-form-group and on valdr-messages if one of the form items is invalid
            invalid: 'ng-invalid invalid',
            // added on valdr-messages if the form item this message is associated with is dirty
            dirty: 'ng-dirty',
            // added on valdr-messages if the form item this message is associated with is pristine
            pristine: 'ng-pristine',
            // added on valdr-messages if the form item this message is associated with has been blurred
            touched: 'ng-touched',
            // added on valdr-messages if the form item this message is associated with has not been blurred
            untouched: 'ng-untouched',
            // added on valdr-form-group if one of the contained items is currently invalid, dirty and has been blurred
            invalidDirtyTouchedGroup: 'valdr-invalid-dirty-touched-group'
        });

    angular
        .module('classesClientApp')
        .config(ValdrConfig);

    ValdrConfig.$inject = ['valdrProvider', 'userValidationProvider', 'teacherValidationProvider'];

    function ValdrConfig(valdrProvider, userValidationProvider, teacherValidationProvider) {

        // Add validators
        valdrProvider.addValidator('cityValidator');

        // User validation constraints
        valdrProvider.addConstraints(userValidationProvider.getValidationConstraints());


        // Teacher validation constraints
        valdrProvider.addConstraints(teacherValidationProvider.getValidationConstraints());

    }
})();