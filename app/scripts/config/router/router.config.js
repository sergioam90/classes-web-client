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
            })

            .state('root.login', {
                url: '/account/login',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/login/login.html',
                        controller: 'LoginController as vm'
                    }
                }
            })

            .state('root.signup', {
                url: '/signup?target',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/signup.html',
                        controller: 'SignupController as vm'
                    }
                }
            })

            .state('root.signup.user', {
                url: '/user',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/user/signup.user.html',
                        controller: 'SignupUserController as vm'
                    }
                }
            })

            .state('root.signup.socialUser', {
                url: '/socialUser',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/social-user/signup.social-user.html',
                        controller: 'SignupSocialUserController as vm',
                        resolve: {
                            user: function(UserService){
                                return UserService.me().then(function (user) {
                                    return user;
                                }, function (error) {
                                    // TODO: Handle errors
                                });
                            }
                        }
                    }
                }
            })

            .state('root.signup.teacher', {
                url: '/teacher',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/teacher/signup.teacher.html',
                        controller: 'SignupTeacherController as vm',
                        resolve: {
                            user: function(UserService){
                                return UserService.me().then(function(user){
                                    return user;
                                });
                            }
                        }
                    }
                }
            })

            .state('root.signup.student', {
                url: '/student',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/student/signup.student.html',
                        controller: 'SignupStudentController as vm'
                    }
                }
            })

            .state('root.facebookCallback', {
                url: '/facebook?code',
                views: {
                    'container@': {
                        controller: 'FacebookController as vm'
                    }
                }
            })

            .state('root.userVerification', {
                url: '/user/{id}/verification?code',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/method/local/local.template.html',
                        controller: 'LocalController as vm'
                    }
                }
            })

            .state('root.account', {
                abstract: true,
                url: '/account',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/account.html'
                    }
                }
            })

            .state('root.account.user', {
                url: '/user',
                views: {
                    '': {
                        templateUrl: 'scripts/presentation/account/user-profile/my.user.profile.html',
                        controller: 'MyUserProfileController as vm',
                        resolve: {
                            user: function (AccountService) {
                                return AccountService.loadUser().then(function (user) {
                                    return user;
                                }, function (error) {
                                    // TODO: Should we redirect home?
                                    return undefined;
                                });
                            }
                        }
                    }
                }
            })

            .state('root.account.student', {
                url: '/student',
                views: {
                    '': {
                        templateUrl: 'scripts/presentation/account/student-profile/my.student.profile.html',
                        controller: 'MyStudentProfileController as vm',
                        resolve: {
                            student: function (StudentService) {
                                return StudentService.me().then(function (student) {
                                    return student;
                                }, function (error) {
                                    return undefined;
                                });
                            }
                        }
                    }
                }
            })

            .state('root.account.teacher', {
                url: '/teacher',
                views: {
                    '': {
                        templateUrl: 'scripts/presentation/account/teacher-profile/my.teacher.profile.html',
                        controller: 'MyTeacherProfileController as vm',
                        resolve: {
                            teacher: function (TeacherService) {
                                return TeacherService.me().then(function (teacher) {
                                    return teacher;
                                }, function (error) {
                                    return undefined;
                                });
                            }
                        }
                    }
                }
            })

            .state('root.teachersSearch', {
                url: '/teacher/search',
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
