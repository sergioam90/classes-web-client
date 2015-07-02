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
                url: '/account/register',
                templateUrl: templateUrlPrefix + 'account/register/register.html',
                controller: 'RegisterController'
            })
            .state('account', {
                url: '/account',
                templateUrl: templateUrlPrefix + 'account/account.html',
                controller: 'AccountController'
            })
            .state('teachersSearch', {
                url: '/teachers/search',
                templateUrl: templateUrlPrefix + 'teachers/search/teachers.search.html',
                controller: 'TeachersSearchController'
            });

    }

})();
