(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupFacebookController', SignupFacebookController);

    SignupFacebookController.$inject = ['SocialService', '$location', 'AccountService', 'UserService', '$state', 'InterruptionService'];

    function SignupFacebookController(SocialService, $location, AccountService, UserService, $state, InterruptionService) {

        // TODO: Check code existance
        var params = $location.search();

        var target = $state.current.data.target;

        SocialService.getFacebookAuthorization(params.code, target).then(authSuccess, authError);

        /* Implementation */

        function authSuccess(token) {
            token = token.plain();

            // TODO: Check errors

            AccountService.loginWithToken(token).then(function () {

                // Check if user is confirmed or not
                UserService.me().then(function (user) {
                    if (user.confirmed) {
                        InterruptionService.restore();
                    } else {
                        $state.go('root.signup-' + target + '.step.social-user');
                    }
                });
            });

        }

        function authError(error) {
            console.log(error);
        }

    }

})();