module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

//LESS//
    less: {
      development: {
        options: {
          paths: ['assets/css']
        },
        files: {
          'build/style.css': ['src/bootstrap.css', 'src/style.less']
        }
      },
      production: {
        options: {
          paths: ['assets/css'],
        },
        files: {
          'build/style.css': ['src/bootstrap.css', 'src/style.less']
        }
      }
    },

//MINIFY CSS//
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build',
          src: ['*.css', '!*.min.css'],
          dest: 'build/release',
          ext: '.min.css'
        }]
      }
    },

//JADE//
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "build/index.html": "src/index.jade",
          "build/index_test.html": "src/index_test.jade"
        }
      }
    },

//MINIFY HTML//
    htmlmin: {                                     // Task 
      dist: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files 
          'build/release/index.html': 'build/index.html',
          'build/release/index_test.html': 'build/index_test.html'     // 'destination': 'source' 
        }
      }
    },

//JSHINT//
    jshint: {
            all: ['Gruntfile.js', 'src/customScript.js']
    },

//CONCATENATE AND UGLIFY//
    uglify: {
      my_target: {
        files: {
          'build/release/project.min.js': ['src/bootstrap.min.js', 'src/customScript.js']
        }
      }
    }

});
  // Load the plugin that provides compilation of less into css.
  grunt.loadNpmTasks('grunt-contrib-less');
  // Load the plugin that provides minification of css.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Load the plugin that provides compilation of jade template.
  grunt.loadNpmTasks('grunt-contrib-jade');
  // Load the plugin that provides minification of html created by jade.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Load the plugin that provides jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Load the plugin that provides uglification of js
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['less', 'cssmin', 'jade', 'htmlmin', 'jshint', 'uglify']);

};