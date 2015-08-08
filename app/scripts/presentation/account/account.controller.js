(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['AccountService', 'Students', 'Subjects', 'Teachers', '$scope', '$state'];

    function AccountController(AccountService, Students, Subjects, Teachers, $scope, $state) {
        var vm = this;

    }

})();
