module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'directive/**/*.js'],
      options: {
        // options here to override JSHint defaults
        multistr: true,
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'directive/**/*.html'],
      tasks: ['jshint'],
      options: {
        livereload: true
      }
    },
    open: {
      server: {
        url: 'http://localhost:8002'
      }
    },
    connect: {
      bower: {
        options: {
          port: 8001,
          base: 'bower_components'
        }
      },
      server: {
        options: {
          port: 8002,
          base: 'directive',
          livereload: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint', 'connect', 'open', 'watch']);

};