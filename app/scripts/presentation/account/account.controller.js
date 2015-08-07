(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['AccountService', 'Students', 'Subjects', 'Teachers', '$scope', '$state'];

    function AccountController(AccountService, Students, Subjects, Teachers, $scope, $state) {
        var vm = this;

        vm.user = {};

        $scope.go = function (route) {
            $state.go(route);
        };


        ////////////////////////////

        /*
        function refreshUser() {
            AccountService.getMe().then(function () {
                vm.subjects = [];

                vm.studentTabVisible = $rootScope.currentUser.student ? true : false;
                vm.teacherTabVisible = $rootScope.currentUser.teacher ? true : false;

                Subjects.getList().then(processSubjects);

                function processSubjects(subjects) {
                    angular.forEach(subjects, function (value, i) {

                        value.selected = false;

                        if ($rootScope.currentUser.teacher) {
                            angular.forEach($rootScope.currentUser.teacher.subjects, function (teacherSubject, i) {
                                value.selected = value.selected || (value.id === teacherSubject.id);
                            });
                        }

                        vm.subjects.push(value);
                    });
                }
            });
        }

        function showTeacherForm() {
            //$scope.showTeacherEdit = true;
            vm.teacherTabVisible = true;
            vm.showNewTeacherForm = true;
        }

        function showStudentForm() {
            Students.post({}).then(function () {
                vm.studentTabVisible = true;
                refreshUser();
            });
        }

        function createTeacherProfile(teacher) {
            teacher.subjects = [];

            angular.forEach(vm.subjects, function (subject, i) {
                if (subject.selected) {
                    teacher.subjects.push({'id': subject.id});
                }
            });

            Teachers.post(teacher).then(refreshUser);
        }
        */

    }


})();