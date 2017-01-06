module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);



  var javascriptFiles = [
    'src/app.js', 'src/**/**.js', 'dist/templates.js',
  ];

  var libraryFiles = [
    'bower_components/angular/angular.min.js',


  ]

  var cssFiles = [

    "src/**/*.css"
  ];




  grunt.initConfig({
    ngtemplates: {
      app: {
        src: '**/**.view.html',
        dest: 'dist/templates.js',
        options: {
          url: function(url) {
            return url.replace('.view.html', '').replace('source/', '');
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
        tasks: ['concat']
      },
      css: {
        files: 'src/**/**.css',
        tasks: ['concat_css']
      },
      view: {
        files: 'src/**/**.view.html',
        tasks: ['ngtemplates', 'concat']
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
    }

  });



  grunt.registerTask('default', ['ngtemplates', 'concat_css', 'concat', 'watch']);
  grunt.registerTask('compile', ['ngtemplates', 'concat_css', 'concat:library', 'concat:app', 'removelogging', 'concat:together', 'uglify', 'cssmin']);


};
