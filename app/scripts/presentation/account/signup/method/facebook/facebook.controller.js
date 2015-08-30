(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('FacebookController', FacebookController);

    FacebookController.$inject = ['SocialService', '$location', 'AccountService', '$state'];

    function FacebookController(SocialService, $location, AccountService, $state) {
        var vm = this;

        // TODO: Check code existance

        SocialService.getFacebookAuthorization($location.search().code).then(authSuccess, authError);

        vm.test = $location.search().code;

        /* Implementation */

        function authSuccess(token) {
            token = token.plain();

            console.log(token);

            AccountService.loginWithToken(token);

            // TODO: Check errors

            $state.go('root.confirm');
        }

        function authError(error) {
            console.log(error);
        }

    }

})();