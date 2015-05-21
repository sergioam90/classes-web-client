'use strict';

/**
 * @ngdoc function
 * @name classesClientApp.controller:TeachersCtrl
 * @description
 * # TeachersCtrl
 * Controller of the classesClientApp
 */
angular.module('classesClientApp')
    .controller('TeachersCtrl', function ($scope, Teachers, $location, Subjects) {
        $scope.teachers = [];

        Teachers.getList().then(function (teachers) {
            $scope.teachers = teachers;
        });

        $scope.redirect = function (id) {
            $location.path('/teachers/' + id);
        };

        Subjects.getList().then(function(subjects){
          $scope.subjects = subjects;
        });
    });
