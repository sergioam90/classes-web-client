(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(TranslateConfig);

    TranslateConfig.$inject = ['$translateProvider'];

    function TranslateConfig($translateProvider) {

        $translateProvider.translations('es_ar', {
            'user.email.invalid': 'Email inválido',
            'user.email.required': 'El email es obligatorio',
            'user.password.invalid': 'La contraseña debe tener mas de 8 caracteres y al menos una letra y un número',
            'user.password.required': 'La contraseña es obligatoria',
            'user.firstName.size': 'El nombre debe contener al menos una letra',
            'user.firstName.required': 'El nombre es obligatorio',
            'user.lastName.size': 'El apellido debe contener al menos una letra',
            'user.lastName.required': 'El apellido es obligatorio',
            'user.gender.required': 'El género es obligatorio',
            'user.birthDate.required': 'La fecha de nacimiento es obligatoria'
        });

        $translateProvider.preferredLanguage('es_ar');

        $translateProvider.useSanitizeValueStrategy('sanitize');
    }
})();