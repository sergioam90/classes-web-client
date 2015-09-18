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
                url: '/home',
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

            .state('root.early', {
                url: '/',
                views: {
                    'header@': {},
                    'container@': {
                        templateUrl: 'scripts/presentation/teacher/early-signup/early-signup.html',
                        controller: 'HomeController as vm'
                    },
                    'footer@': {}
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

            /* User states */

            .state('root.login', {
                url: '/account/login',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/login/login.html',
                        controller: 'LoginController as vm'
                    }
                },
                data: {
                    isInterruption: true
                }
            })

            .state('root.signup', {
                url: '/signup?target',
                abstract: true,
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/signup.html',
                        controller: 'SignupController as vm'
                    }
                },
                data: {
                    isInterruption: true
                }
            })

            .state('root.signup.about', {
                url: '/about',
                templateUrl: 'scripts/presentation/account/signup/about/signup.about.html',
                controller: 'SignupAboutController as vm',
                data: {
                    isInterruption: true,
                    stepNumber: 1
                }
            })

            .state('root.signup.method', {
                url: '/method',
                templateUrl: 'scripts/presentation/account/signup/method/signup.method.html',
                controller: 'SignupMethodController as vm',
                data: {
                    isInterruption: true,
                    stepNumber: 2
                }
            })

            .state('root.signup.teacher', {
                url: '/teacher',
                templateUrl: 'scripts/presentation/account/signup/teacher/signup.teacher.html',
                controller: 'SignupTeacherController as vm',
                resolve: {
                    user: function (UserService) {
                        return UserService.me().then(function (user) {
                            return user;
                        });
                    }
                },
                data: {
                    isInterruption: true,
                    stepNumber: 4
                }
            })

            .state('root.signup.student', {
                url: '/student',
                templateUrl: 'scripts/presentation/account/signup/student/signup.student.html',
                controller: 'SignupStudentController as vm',
                data: {
                    isInterruption: true,
                    stepNumber: 4
                }
            })

            /* Local user states */

            .state('root.signup.localUser', {
                url: '/localUser',
                templateUrl: 'scripts/presentation/account/signup/local-user/signup.local-user.html',
                controller: 'SignupLocalUserController as vm',
                data: {
                    isInterruption: true,
                    stepNumber: 3
                }
            })

            .state('root.signup.emailSent', {
                url: '/emailSent',
                templateUrl: 'scripts/presentation/account/signup/local-user/confirmation/signup.local-user.confirmation.html',
                controller: 'LocalUserConfirmationController as vm',
                data: {
                    isInterruption: true,
                    stepNumber: 3
                }
            })

            .state('root.userVerification', {
                url: '/user/{id}/verification?code?redirectUri',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/callback/local/local-user.verification.template.html',
                        controller: 'UserVerificationController as vm'
                    }
                },
                data: {
                    isInterruption: true
                }
            })

            /* Social user states */

            .state('root.signup.socialUser', {
                url: '/socialUser',
                templateUrl: 'scripts/presentation/account/signup/social-user/signup.social-user.html',
                controller: 'SignupSocialUserController as vm',
                resolve: {
                    user: function (UserService) {
                        return UserService.me().then(function (user) {
                            return user;
                        }, function (error) {
                            // TODO: Handle errors
                        });
                    }
                },
                data: {
                    isInterruption: true,
                    stepNumber: 3
                }
            })

            .state('root.signup.facebook', {
                url: '/facebook?code',
                templateUrl: 'scripts/presentation/account/signup/callback/facebook/signup.facebook.template.html',
                controller: 'SignupFacebookController as vm',
                data: {
                    isInterruption: true,
                    stepNumber: 3
                }
            })

            /* Account states */

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

})
();
