(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('MainController', MainController);

    MainController.$inject = ['Subjects'];

    function MainController(Subjects) {
        var vm = this;

        Subjects.getList().then(function (subjects) {
            vm.subjects = subjects.plain();
        });
    }

})();
