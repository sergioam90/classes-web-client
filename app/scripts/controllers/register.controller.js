'use strict';

/**
 * @ngdoc function
 * @name classesClientApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the classesClientApp
 */
angular.module('classesClientApp')
    .controller('RegisterCtrl', function ($scope, UserService, $location) {
        $scope.register = function(user){
            UserService.register(user).then(
                function(){
                  $location.path('/login');
                },
                function(){
                    alert('Error in registration');
                }
            );
        };
    });
