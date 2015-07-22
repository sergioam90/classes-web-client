(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('UserService', UserService);

    UserService.$inject = ['Users', 'GenderService'];

    function UserService(Users, GenderService) {

        var vm = this;

        vm.me = me;
        vm.editUser = editUser;


        /* Implementation */

        function me() {
            return Users.one('me').get().then(function(user){
                // Translate gender to readable string
                user.gender = GenderService.getName(user.gender);

                return user;
            });
        }

        function editUser(user){
            return Users.one('me').put(user);
        }

    }

})();
