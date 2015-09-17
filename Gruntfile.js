// Generated on 2015-03-24 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

// TODO: Modularize this file
// TODO: Externalize api server url settings

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        cdnify: 'grunt-google-cdn',
        ngconstant: 'grunt-ng-constant'
    });

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Application variables
        app: {
            scripts: [
                // JS files to be included by includeSource task into index.html
                'scripts/app.module.js',
                'scripts/app.constant.js',
                'scripts/app.static.config',
                'scripts/app.config',
                'scripts/*.js',
                'scripts/**/*.js'
            ],
            styles: [
                'scripts/**/*.css'
            ]
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/**.js'],
                tasks: ['includeSource', 'newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/**/*.css'],
                tasks: ['newer:copy:styles', 'includeSource', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/scripts/**/*.js',
                    '<%= yeoman.app %>/scripts/**/*.html',
                    '<%= yeoman.app %>/scripts/**/*.css',
                    '<%= yeoman.app %>/*.html',
                    '.tmp/styles/**/*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            includeSource: {
                // Watch for added and deleted scripts to update index.html
                files: ['scripts/**/*.js', 'scripts/**/*.css'],
                tasks: ['includeSource'],
                options: {
                    event: ['added', 'deleted']
                }
            }
        },

        includeSource: {
            // Task to include files into index.html
            options: {
                basePath: 'app',
                baseUrl: ''
            },
            app: {
                files: {
                    'app/index.html': 'app/index.html'
                    // you can add karma config as well here if want inject to karma as well
                }
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            require('connect-modrewrite')(['!^.*(\\.css|\\.html|\\.ico|\\.jpg|\\.js|\\.png|\\.woff2).*$ /index.html [L]']),
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/**/*.js',
                    '<%= yeoman.dist %>/scripts/**/*.html',
                    '<%= yeoman.dist %>/scripts/**/*.css',
                    '<%= yeoman.dist %>/styles/**/*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/**/*.css'],
            js: ['<%= yeoman.dist %>/scripts/**/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/scripts',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles'
                ],
                blockReplacements: {
                    base: function (block) {
                        return ['<base href="', block.dest, '">'].join('');
                    }
                },
                patterns: {
                    js: [
                        [/(scripts\/.*?\.html)/gm, 'Replacing html']
                    ]
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'scripts/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    src: '<%= yeoman.app %>/index.html',
                    dest: '<%= yeoman.dist %>/404.html'
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'scripts/**/*.html',
                        'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome',
                    src: 'fonts/*.*',
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/materialize',
                    src: 'font/roboto/*.*',
                    dest: '<%= yeoman.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>',
                dest: '.tmp/styles/',
                src: '**/*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'newer:imagemin',
                'svgmin'
            ]
        },

        // Sets the enviroment constants for angular
        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                wrap: "(function(){ 'use strict';\n\n {%= __ngModule %}}\n)();",
                name: 'appConstant',
                dest: '.tmp/scripts/app.static.config.js'
            },
            // Environment targets
            development: {
                constants: {
                    appConfig: {
                        API_SERVER_URL: 'classes.noip.me:8080'
                    }
                }
            },
            production: {
                constants: {
                    appConfig: {
                        API_SERVER_URL: 'classes-bahia.herokuapp.com'
                    }
                }
            }
        },

        'gh-pages': {
            options: {
                base: 'dist',
                only: ['**/*', '!CNAME'],
                message: 'Auto-generated commit by Grunt build'
            },
            src: '**/*'
        },

        // TODO: Fill if necessary
        'divshot:push': {
            production: {
                // options
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:livereload', 'watch']);
        }

        grunt.task.run([
            'clean:server',
            'ngconstant:development',
            'includeSource',
            'wiredep',
            'concurrent:server',
            'autoprefixer:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', '', function () {

            grunt.task.run([
                'clean:dist',
                'ngconstant:production',
                'includeSource',
                'wiredep',
                'useminPrepare',
                'concurrent:dist',
                'autoprefixer',
                'concat',
                'ngAnnotate',
                'copy:dist',
                'cdnify',
                'cssmin',
                'newer:uglify',
                'filerev',
                'usemin',
                'htmlmin',
                //'gh-pages',
                'divshot:push:production'
            ]);
        }
    )
    ;

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
}
;
