(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$rootScope', 'AccountService', 'Students', 'Subjects', 'Teachers', 'Degrees'];

    function AccountController($rootScope, AccountService, Students, Subjects, Teachers, Degrees) {
        var vm = this;

        vm.newTeacher = {};
        vm.studentTabVisible = false;
        vm.startTeaching = showTeacherForm;
        vm.startLearning = showStudentForm;
        vm.teacherTabVisible = false;
        // TODO: Rename
        vm.sendTeacherForm = createTeacherProfile;

        Degrees.getList().then(processDegrees);

        if (AccountService.isAuthenticated()) {
            refreshUser();
        }

        ////////////////////////////

        function refreshUser() {
            AccountService.me().then(function () {
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

        function processDegrees(degrees) {
            vm.degrees = degrees.plain();
        }
    }


})();
