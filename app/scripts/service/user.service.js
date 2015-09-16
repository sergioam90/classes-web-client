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
        vm.signup = signup;
        vm.confirm = confirm;

        /*
         TODO: Fix birthDate hack
         Datepicker works correctly only with 8601
         */

        /* Implementation */

        function signup(user) {
            user.birthDate = moment(user.birthDate).format('YYYY-M-D');

            return Users.post(user);
        }

        function me() {
            return Users.one('me').get().then(function (user) {
                user.birthDate = moment(user.birthDate).format();

                console.log(user.birthDate);

                return user;
            });
        }

        function saveUser(user) {
            user.birthDate = moment(user.birthDate).format('YYYY-M-D');

            return Users.one('me').customPUT(user);
        }

        function confirm(user) {
            user.birthDate = moment(user.birthDate).format('YYYY-M-D');

            return Users.one('me').one('confirmation').customPOST(user);
        }

    }

})();
