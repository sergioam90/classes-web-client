(function () {
    'use strict';

    // TODO: Use ui-router
    angular
        .module('classesClientApp')
        .config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function RouterConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        // TODO: Enable this for making urls pretty
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        // IMPORTANT: DO NOT REFACTOR templateUrl STRINGS, THEY ARE PROCESSED BY USEMIN.
        // USE ALWAYS THIS PATTERN 'scripts/**/*.html'

        // TODO: Define object with states and iterate it (register global properties in foreach loop)
        $stateProvider
            .state('root', {
                abstract: true,
                url: '',
                views: {
                    'header': {
                        templateUrl: 'scripts/presentation/header/header.html',
                        controller: 'HeaderController as vm'
                    }
                }
            })
            .state('root.home', {
                url: '/',
                views: {
                    'header@': {},
                    'container@': {
                        templateUrl: 'scripts/presentation/home/home.html',
                        controller: 'HomeController as vm'
                    },
                    'footer@': {
                        templateUrl: 'scripts/presentation/footer/footer.html'
                        /*controller: 'FooterController as vm'*/
                    }
                }
            })
            .state('root.about', {
                url: '/about',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/about/about.html',
                        controller: 'AboutController as vm'
                    }
                }
            }).state('root.login', {
                url: '/account/login',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/login/login.html',
                        controller: 'LoginController as vm'
                    }
                }
            })
            .state('root.register', {
                abstract: true,
                url: '/account/register/{target}',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/register/register.html',
                        controller: 'RegisterController as vm'
                    }
                }
            })
            .state('root.register.method', {
                url: '/method',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/register/register.method.html'
                    }
                }
            })
            .state('root.register.personal', {
                url: '/personal',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/register/register.personal.html'
                    }
                }
            })
            .state('root.register.teacher', {
                url: '/teacher',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/register/teacher/register.teacher.html'
                    }
                }
            })
            .state('root.register.student', {
                url: '/student',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/register/student/register.student.html'
                    }
                }
            })
            .state('root.account', {
                abstract: true,
                url: '/account',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/account.html'
                        // TODO: for possible future use
                        // controller: 'AccountController as vm'
                    }
                }
            })
            .state('root.account.user', {
                url: '/user',
                views: {
                    '': {
                        templateUrl: 'scripts/presentation/account/user-profile/my.user.profile.html',
                        controller: 'MyUserProfileController as vm'
                    }
                }
            })
            .state('root.account.student', {
                url: '/student',
                views: {
                    '': {
                        templateUrl: 'scripts/presentation/account/student-profile/my.student.profile.html',
                        controller: 'MyStudentProfileController as vm'
                    }
                }
            })
            .state('root.account.teacher', {
                url: '/teacher',
                views: {
                    '': {
                        templateUrl: 'scripts/presentation/account/teacher-profile/my.teacher.profile.html',
                        controller: 'MyTeacherProfileController as vm'
                    }
                }
            })
            .state('root.teachersSearch', {
                url: '/teacher/search?city?subjects',
                reloadOnSearch: false,
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/teacher/search/teachers.search.html',
                        controller: 'TeachersSearchController as vm'
                    }
                }
            })
            .state('root.teacherProfile', {
                url: '/teachers/{id}',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/teacher/profile/teacher.profile.html',
                        controller: 'TeacherProfileController as vm',
                        resolve: {
                            teacher: function ($stateParams, TeacherService) {
                                return TeacherService.getById($stateParams.id);
                            }
                        }
                    }
                }
            })
            .state('root.maps', {
                url: '/maps',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/maps/maps.html',
                        controller: 'MapsController as vm'
                    }
                }
            });

    }

})();
