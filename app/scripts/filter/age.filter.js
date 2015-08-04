(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('age', AgeFilter);

    function AgeFilter() {

        function calculateAge(birthday) {

            // TODO: Format is known. Put it here.
            var day = moment(birthday, 'YYYY-MM-DD');

            return moment().diff(day, 'years');
        }

        return function (birthdate) {
            return calculateAge(birthdate);
        };
    }
})();