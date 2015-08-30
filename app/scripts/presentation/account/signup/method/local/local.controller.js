(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('LocalController', LocalController);

    LocalController.$inject = ['$location', '$stateParams', 'LocalService', 'AccountService'];

    function LocalController($location, $stateParams, LocalService, AccountService) {
        var vm = this;

        vm.id = $stateParams.id;
        vm.code = $location.search().code;

        LocalService.sendVerification(vm.id, vm.code).then(function (token) {
            token = token.plain();

            AccountService.loginWithToken(token);

            console.log(token);
        });

    }

})();