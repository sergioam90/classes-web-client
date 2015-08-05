(function () {
    'use strict';

    // TODO: Use ui-router
    angular
        .module('classesClientApp')
        .config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function RouterConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        // TODO: Enable this for making urls pretty
        //$locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        var templateUrlPrefix = 'scripts/presentation/';

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: templateUrlPrefix + 'main/main.html',
                controller: 'MainController'
            })
            .state('about', {
                url: '/about',
                templateUrl: templateUrlPrefix + 'about/about.html',
                controller: 'AboutController'
            }).state('login', {
                url: '/account/login',
                templateUrl: templateUrlPrefix + 'account/login/login.html',
                controller: 'LoginController'
            })
            .state('register', {
                abstract: true,
                url: '/account/register/{target}',
                templateUrl: templateUrlPrefix + 'account/register/register.html',
                controller: 'RegisterController'
            })
            .state('register.method', {
                url: '/method',
                templateUrl: templateUrlPrefix + 'account/register/register.method.html'
            })
            .state('register.personal', {
                url: '/personal',
                templateUrl: templateUrlPrefix + 'account/register/register.personal.html'
            })
            .state('register.teacher', {
                url: '/teacher',
                templateUrl: templateUrlPrefix + 'account/register/teacher/register.teacher.html'
            })
            .state('register.student', {
                url: '/student',
                templateUrl: templateUrlPrefix + 'account/register/student/register.student.html'
            })
            .state('account', {
                abstract: true,
                url: '/account',
                templateUrl: templateUrlPrefix + 'account/account.html',
                controller: 'AccountController'
            })
            .state('account.user', {
                url: '/user',
                templateUrl: templateUrlPrefix + 'account/user-profile/my.user.profile.html',
                controller: 'MyUserProfileController'
            })
            .state('account.student', {
                url: '/student',
                templateUrl: templateUrlPrefix + 'account/student-profile/my.student.profile.html',
                controller: 'MyStudentProfileController'
            })
            .state('account.teacher', {
                url: '/teacher',
                templateUrl: templateUrlPrefix + 'account/teacher-profile/my.teacher.profile.html',
                controller: 'MyTeacherProfileController'
            })
            .state('teachersSearch', {
                url: '/teacher/search',
                templateUrl: templateUrlPrefix + 'teacher/search/teachers.search.html',
                controller: 'TeachersSearchController'
            })
            .state('teacherProfile', {
                url: '/teachers/{id}',
                templateUrl: templateUrlPrefix + 'teacher/profile/teacher.profile.html',
                controller: 'TeacherProfileController'
            })
            .state('maps', {
                url: '/maps',
                templateUrl: templateUrlPrefix + 'maps/maps.html',
                controller: 'MapsController'
            });

    }

})();
