(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('UserService', UserService);

    UserService.$inject = ['Users'];

    function UserService(Users) {

        var vm = this;

        vm.me = me;
        vm.saveUser = saveUser;


        /* Implementation */

        function me() {
            return Users.one('me').get();
        }

        function saveUser(user){
            return Users.one('me').customPUT(user);
        }

    }

})();
