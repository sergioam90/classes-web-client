(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(TranslateConfig);

    TranslateConfig.$inject = ['$translateProvider'];

    function TranslateConfig($translateProvider) {

        $translateProvider.translations('es_ar', {

            // User validation messages
            'user.email.invalid': 'Email inválido',
            'user.email.required': 'El email es obligatorio',
            'user.password.invalid': 'La contraseña debe tener más de 8 caracteres y al menos una letra y un número',
            'user.password.required': 'La contraseña es obligatoria',
            'user.firstName.size': 'El nombre debe contener al menos una letra',
            'user.firstName.required': 'El nombre es obligatorio',
            'user.lastName.size': 'El apellido debe contener al menos una letra',
            'user.lastName.required': 'El apellido es obligatorio',
            'user.gender.required': 'El género es obligatorio',
            'user.birthDate.required': 'La fecha de nacimiento es obligatoria',
            'user.birthDate.past': '¿Todavía no naciste?',

            // Teacher validation messages
            'teacher.degree.required': 'El nivel de estudios es obligatorio',
            'teacher.location.required': 'La dirección es obligatoria',
            'teacher.location.invalidCity': 'El servicio todavía no esta disponible en esa ciudad',
            'teacher.fee.low': 'El precio de la clase debe ser mayor a $20',
            'teacher.fee.high': 'El precio de la clase debe ser menor a $400',
            'teacher.fee.required': 'El precio de la clase es obligatorio',
            'teacher.phone.long': 'El número de teléfono es demasiado largo',
            'teacher.phone.required': 'El número de teléfono es obligatorio',
            'teacher.description.long': 'La descripción debe ser menor a 512 caracteres',
            'teacher.description.required': 'La descripción es obligatoria',
            'teacher.schedule.required': 'Debe seleccionar al menos un horario',
            'teacher.audience.required': 'Debe seleccionar al menos un tipo'
        });

        $translateProvider.preferredLanguage('es_ar');

        $translateProvider.useSanitizeValueStrategy('sanitize');
    }
})();