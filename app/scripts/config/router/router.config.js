(function () {
    'use strict';

    // TODO: Use ui-router
    angular
        .module('classesClientApp')
        .config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RouterConfig($stateProvider, $urlRouterProvider) {

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
                url: '/account',
                templateUrl: templateUrlPrefix + 'account/account.html',
                controller: 'AccountController'
            })
            .state('studentProfile', {
                url: '/studentProfile',
                templateUrl: templateUrlPrefix + 'account/student-profile/student.profile.html',
                controller: 'StudentProfileController'
            })
            .state('teachersSearch', {
                url: '/teachers/search',
                templateUrl: templateUrlPrefix + 'teachers/search/teachers.search.html',
                controller: 'TeachersSearchController'
            })
            .state('maps', {
                url: '/maps',
                templateUrl: templateUrlPrefix + 'maps/maps.html',
                controller: 'MapsController'
            });

    }

})();
