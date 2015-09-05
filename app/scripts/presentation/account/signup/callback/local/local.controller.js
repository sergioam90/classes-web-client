(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('UserVerificationController', UserVerificationController);

    UserVerificationController.$inject = ['$location', '$state', '$stateParams', 'LocalService', 'AccountService', 'UserService'];

    function UserVerificationController($location, $state, $stateParams, LocalService, AccountService, UserService) {

        // TODO: Handle errors
        // Get user id from url
        var id = $stateParams.id;

        // Get code from url
        var code = $location.search().code;

        // Send verification code, and wait for auth token
        LocalService.sendVerification(id, code).then(function (token) {
            token = token.plain();

            AccountService.loginWithToken(token).then(function () {

                UserService.me().then(function (user) {

                    $state.go('root.signup.' + user.target);

                });

            });
        }, function (error) {
            // TODO: Handle already used code correctly
            if (error.status === 403) {
                alert('Code has already been used');
            } else {
                console.log(error);
            }
        });

    }

})();