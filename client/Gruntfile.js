module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);



    var javascriptFiles = [
        'src/root.js', 'src/**/**.js', 'dist/templates.js',
    ];

    var libraryFiles = [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/mui/packages/cdn/js/mui.min.js',
        'bower_components/mui/packages/cdn/angular/mui-angular.min.js',
        'bower_components/cropper/dist/cropper.min.js',






    ]

    var cssFiles = [
        'bower_components/normalize-css/normalize.css',
        'bower_components/mui/packages/cdn/css/mui.css',
        'bower_components/animate.css/animate.min.css',
        'bower_components/cropper/dist/cropper.min.css',


        "src/**/*.css"
    ];




    grunt.initConfig({
        copy: {
            index: {
                expand: false,
                src: 'src/index.html',
                dest: 'dist/index.html'
            },
            indexIOS: {
                expand: false,
                src: 'src/index-ios.html',
                dest: 'dist/index-ios.html'
            },
            cordova: {
              expand: true,
              src: '**',
              dest: 'cordova/www',
              cwd: 'dist/'

            }
        },
        clean: ['dist/*', 'cordova/www/*'],
        ngtemplates: {
            app: {
                src: '**/**.view.html',
                dest: 'dist/templates.js',
                options: {
                    url: function(url) {
                        return url.replace('.view.html', '').replace('src/', '');
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        concat: {
            library: {

                src: libraryFiles,
                dest: 'dist/library.js'

            },
            app: {

                src: javascriptFiles,
                dest: 'dist/app.js'

            },
            together: {

                src: [
                    'dist/library.js',
                    'dist/app.js'
                ],
                dest: 'dist/app.js'

            }
        },
        watch: {
            js: {
                files: 'src/**/**.js',
                tasks: ['concat'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true,
                }
            },
            css: {
                files: 'src/**/**.css',
                tasks: ['concat_css'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true,
                }
            },
            view: {
                files: 'src/**/**.view.html',
                tasks: ['ngtemplates', 'concat'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true,
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/app.js': ['dist/app.js']
                }
            }
        },
        removelogging: {
            dist: {
                src: "dist/app.js",
                dest: "dist/app.js",

                options: {
                    // see below for options. this is optional.
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/app.css': ['dist/app.css']
                }
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: cssFiles,
                dest: "dist/app.css"
            },
        },
        connect: {
            site: {
                options: {
                    port: 9000,
                    base: 'dist',
                    livereload: true
                }
            }
        }

    });



    grunt.registerTask('default', ['clean','ngtemplates', 'concat_css', 'concat', 'copy', 'connect', 'watch']);
    grunt.registerTask('compile', ['ngtemplates', 'concat_css', 'concat:library', 'concat:app', 'removelogging', 'concat:together', 'uglify', 'cssmin', 'copy']);


};
