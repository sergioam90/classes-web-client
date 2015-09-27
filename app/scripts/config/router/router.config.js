(function () {
    'use strict';

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
                },
                resolve: {
                    title: function() {
                        return 'Inicio';
                    }
                },
                onEnter: onEnter
            })

            .state('root.early', {
                url: '/',
                views: {
                    'header@': {
                        templateUrl: 'scripts/presentation/teacher/early-signup/header/header-early-signup.html'
                    },
                    'container@': {
                        templateUrl: 'scripts/presentation/teacher/early-signup/early-signup.html',
                        controller: 'HomeController as vm'
                    },
                    'footer@': {}
                },
                resolve: {
                    title: function() {
                        return 'Inicio';
                    }
                },
                onEnter: onEnter
            })

            .state('root.about', {
                url: '/about',
                views: {
                    'header@': {
                        templateUrl: 'scripts/presentation/teacher/early-signup/header/header-early-signup.html'
                    },
                    'container@': {
                        templateUrl: 'scripts/presentation/about/about.html',
                        controller: 'AboutController as vm'
                    }
                },
                resolve: {
                    title: function() {
                        return 'Nosotros';
                    }
                },
                onEnter: onEnter
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
                resolve: {
                    title: function() {
                        return 'Iniciar sesión';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true
                }
            })

            /*  Teacher signup */

            .state('root.signup-teacher', {
                url: '/signup/teacher',
                abstract: true,
                views: {
                    'header@': {
                        templateUrl: 'scripts/presentation/teacher/early-signup/header/header-early-signup.html'
                    },
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/teacher/signup.teacher.html'
                    }
                },
                data: {
                    isInterruption: true
                }
            })

            .state('root.signup-teacher.about', {
                url: '/about',
                templateUrl: 'scripts/presentation/account/signup/teacher/about/signup.about.html',
                controller: 'SignupAboutController as vm',
                resolve: {
                    title: function() {
                        return 'Información';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true
                }
            })

            .state('root.signup-teacher.method', {
                url: '/method',
                templateUrl: 'scripts/presentation/account/signup/method/signup.method.html',
                controller: 'SignupMethodController as vm',
                resolve: {
                    title: function() {
                        return 'Método';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true,
                    target: 'teacher'
                }
            })

            .state('root.signup-teacher.step', {
                url: '/step',
                abstract: true,
                templateUrl: 'scripts/presentation/account/signup/teacher/step/signup.teacher.step.html',
                controller: 'SignupTeacherStepController as vm',
                data: {
                    isInterruption: true
                }
            })

            .state('root.signup-teacher.step.local-user', {
                url: '/local-user',
                templateUrl: 'scripts/presentation/account/signup/local-user/signup.local-user.html',
                controller: 'SignupLocalUserController as vm',
                resolve: {
                    title: function() {
                        return 'Registro';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true,
                    target: 'teacher'
                }
            })

            .state('root.signup-teacher.step.email-sent', {
                url: '/email-sent',
                templateUrl: 'scripts/presentation/account/signup/local-user/email-sent/signup.local-user.email-sent.html',
                controller: 'SignupLocalUserEmailSentController as vm',
                resolve: {
                    title: function() {
                        return 'Email enviado';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true,
                    target: 'teacher'
                }
            })

            .state('root.signup-teacher.step.social-user', {
                url: '/social-user',
                templateUrl: 'scripts/presentation/account/signup/social-user/signup.social-user.html',
                controller: 'SignupSocialUserController as vm',
                resolve: {
                    user: function (UserService) {
                        return UserService.me().then(function (user) {
                            return user;
                        }, function (error) {
                            // TODO: Handle errors
                        });
                    },
                    title: function () {
                        return 'root.signup.socialUser'; // TODO: set proper title
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true,
                    target: 'teacher'
                }
            })

            .state('root.signup-teacher.facebook', {
                url: '/facebook?code',
                templateUrl: 'scripts/presentation/account/signup/callback/facebook/signup.facebook.html',
                controller: 'SignupFacebookController as vm',
                resolve: {
                    title: function() {
                        return 'Registro - Facebook';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true,
                    target: 'teacher'
                }
            })

            .state('root.signup-teacher.step.data', {
                url: '/data?step',
                reloadOnSearch: false,
                templateUrl: 'scripts/presentation/account/signup/teacher/data/signup.teacher.data.html',
                controller: 'SignupTeacherController as vm',
                resolve: {
                    user: function (UserService) {
                        return UserService.me().then(function (user) {
                            return user;
                        });
                    },
                    title: function() {
                        return 'Registro - Profesor';
                    }
                },
                params: {
                    step: '0'
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true
                }
            })

            .state('root.signup-teacher.plan', {
                url: '/plan',
                templateUrl: 'scripts/presentation/account/signup/teacher/plan/signup.plan.html',
                resolve: {
                    title: function () {
                        return 'Plan';
                        ""
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true
                }
            })

            .state('root.signup-teacher.congratulations', {
                url: '/congratulations',
                templateUrl: 'scripts/presentation/account/signup/teacher/congratulations/signup.congratulations.html',
                resolve: {
                    title: function () {
                        return '¡Felicitaciones!';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true
                }
            })

            /* Student signup */

            .state('root.signup-student', {
                url: '/signup/student',
                abstract: true
            })

            .state('root.signup-student.method', {
                url: '/method',
                templateUrl: 'scripts/presentation/account/signup/method/signup.method.html',
                controller: 'SignupMethodController as vm',
                resolve: {
                    title: function() {
                        return 'Método';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true,
                    target: 'student'
                }
            })

            .state('root.signup-student.data', {
                url: '/student',
                templateUrl: 'scripts/presentation/account/signup/student/signup.student.html',
                controller: 'SignupStudentController as vm',
                resolve: {
                    title: function() {
                        return 'Registro - Estudiante';
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true
                }
            })

            /* Local user states */

            .state('root.userVerification', {
                url: '/user/{id}/verification?code?redirectUri',
                views: {
                    'header@': {
                        templateUrl: 'scripts/presentation/teacher/early-signup/header/header-early-signup.html'
                    },
                    'container@': {
                        templateUrl: 'scripts/presentation/account/signup/callback/local/local-user.verification.html',
                        controller: 'UserVerificationController as vm'
                    }
                },
                resolve: {
                    title: function () {
                        return 'root.userVerification'; // TODO: set proper title
                    }
                },
                onEnter: onEnter,
                data: {
                    isInterruption: true
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
                },
                resolve: {
                    title: function() {
                        return 'root.account.user'; // TODO: set proper title
                    }
                },
                onEnter: onEnter
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
                },
                resolve: {
                    title: function() {
                        return 'root.account.student'; // TODO: set proper title
                    }
                },
                onEnter: onEnter
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
                },
                resolve: {
                    title: function() {
                        return 'root.account.teacher'; // TODO: set proper title
                    }
                },
                onEnter: onEnter
            })

            .state('root.teachersSearch', {
                url: '/teacher/search?city?subjects',
                reloadOnSearch: false,
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/teacher/search/teachers.search.html',
                        controller: 'TeachersSearchController as vm'
                    }
                },
                resolve: {
                    title: function() {
                        return 'root.teachersSearch'; // TODO: set proper title
                    }
                },
                onEnter: onEnter
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
                },
                resolve: {
                    title: function() {
                        return 'root.teacherProfile'; // TODO: set proper title
                    }
                },
                onEnter: onEnter
            })

            .state('root.maps', {
                url: '/maps',
                views: {
                    'container@': {
                        templateUrl: 'scripts/presentation/maps/maps.html',
                        controller: 'MapsController as vm'
                    }
                },
                resolve: {
                    title: function() {
                        return 'root.maps'; // TODO: set proper title
                    }
                },
                onEnter: onEnter
            });
    }

    onEnter.$inject = ['TitleService', 'title'];

    function onEnter(TitleService, title) {
        TitleService.setCurrentTitle(title);
    }

})
();
