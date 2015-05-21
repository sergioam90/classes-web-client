'use strict';

/**
 * @ngdoc function
 * @name classesClientApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the classesClientApp
 */
angular.module('classesClientApp')
  .controller('UserCtrl', function ($scope, $rootScope, UserService, Restangular, Students, Subjects, Teachers, Degrees) {

    var refreshUser = function () {
      UserService.me().then(function () {
        $scope.subjects = [];

        $scope.studentTabVisible = $rootScope.currentUser.student ? true : false;
        $scope.teacherTabVisible = $rootScope.currentUser.teacher ? true : false;

        Subjects.getList().then(function (subjects) {
          angular.forEach(subjects, function (value, i) {

            value.selected = false;

            if ($rootScope.currentUser.teacher) {
              angular.forEach($rootScope.currentUser.teacher.subjects, function (teacherSubject, i) {
                value.selected = value.selected || (value.id === teacherSubject.id);
              });
            }

            $scope.subjects.push(value);
          });
        });
      });
    };

    $scope.newTeacher = {};
    $scope.studentTabVisible = false;
    $scope.teacherTabVisible = false;

    if(UserService.isAuthenticated())
      refreshUser();

    $scope.startTeaching = function () {
      //$scope.showTeacherEdit = true;
      $scope.teacherTabVisible = true;
      $scope.showNewTeacherForm = true;
    };

    $scope.startLearning = function () {
      Students.post({}).then(function () {
        $scope.studentTabVisible = true;
        refreshUser();
      });
    };

    $scope.sendTeacherForm = function (teacher) {

      teacher.subjects = [];

      angular.forEach($scope.subjects, function (subject, i) {
        if (subject.selected)
          teacher.subjects.push({'id': subject.id});
      });

      Teachers.post(teacher).then(function () {
        refreshUser();
      });
    };

    Degrees.getList().then(function (degrees) {
      $scope.degrees = degrees.plain();
    });
  });
