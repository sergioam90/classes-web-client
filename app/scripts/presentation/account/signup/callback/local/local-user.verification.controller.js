(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('UserVerificationController', UserVerificationController);

    UserVerificationController.$inject = ['$location', '$window', '$stateParams', 'LocalService', 'AccountService', 'UserService'];

    function UserVerificationController($location, $window, $stateParams, LocalService, AccountService, UserService) {
        var vm = this;

        // TODO: Handle errors
        // Get user id from url
        var id = $stateParams.id;

        // Get code from url
        var code = $location.search().code;

        // Working in getting the token
        vm.working = true;

        vm.closeWindow = closeWindow;

        initialize();

        function initialize() {

            // Send verification code, and wait for auth token
            LocalService.sendVerification(id, code).then(function (token) {
                token = token.plain();

                AccountService.loginWithToken(token).then(function () {

                    UserService.me().then(function () {
                        vm.working = false;
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

        function closeWindow() {
            if (!vm.working) {
                $window.close();
            }
        }
    }

})();