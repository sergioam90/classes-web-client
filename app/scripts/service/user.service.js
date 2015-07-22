(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('UserService', UserService);

    UserService.$inject = ['Users'];

    function UserService(Users) {

        var vm = this;

        vm.me = me;
        vm.editUser = editUser;


        /* Implementation */

        function me() {
            // TODO: Update call to 'me'
            return Users.one('me').get();
        }

        function editUser(user){
            return Users.one('me').put(user);
        }

    }

})();
