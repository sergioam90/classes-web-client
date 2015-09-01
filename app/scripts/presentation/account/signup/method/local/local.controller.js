(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('LocalController', LocalController);

    LocalController.$inject = ['$location', '$stateParams', 'LocalService', 'AccountService', '$state'];

    function LocalController($location, $stateParams, LocalService, AccountService, $state) {
        var vm = this;

        // TODO: Handle errors
        vm.id = $stateParams.id;
        vm.code = $location.search().code;

        LocalService.sendVerification(vm.id, vm.code).then(function (token) {
            token = token.plain();

            AccountService.loginWithToken(token).then(function (user) {
                $state.go('root.signup.' + user.target);
            });
        });

    }

})();