(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('UserService', UserService);

    UserService.$inject = ['Users', 'AccountService'];

    function UserService(Users, AccountService) {

        var vm = this;

        vm.me = me;
        vm.saveUser = saveUser;


        /* Implementation */

        function me() {
            return Users.one('me').get();
        }

        function saveUser(user){
            return Users.one('me').customPUT(user).then(function (user) {
                AccountService.me = user;

                return user;
            });
        }

    }

})();
