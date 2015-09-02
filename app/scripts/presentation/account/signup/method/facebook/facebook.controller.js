(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('FacebookController', FacebookController);

    FacebookController.$inject = ['SocialService', '$location', 'AccountService', 'UserService', '$state'];

    function FacebookController(SocialService, $location, AccountService, UserService, $state) {
        var vm = this;

        // TODO: Check code existance

        var params = $location.search();

        SocialService.getFacebookAuthorization(params.code, params.target).then(authSuccess, authError);

        /* Implementation */

        function authSuccess(token) {
            token = token.plain();

            // TODO: Check errors

            AccountService.loginWithToken(token).then(function () {

                // Check if user is confirmed or not
                UserService.me().then(function (user) {
                    if (user.confirmed) {
                        $state.go('root.account.user');
                    } else {
                        $state.go('root.signup.socialUser');
                    }
                });
            });

        }

        function authError(error) {
            console.log(error);
        }

    }

})();