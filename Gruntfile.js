module.exports = function(grunt) {

  grunt.initConfig({
    clean: ['.tmp'],
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
    less: {
      development: {
        options: {
          paths: ['directive']
        },
        files: {
          ".tmp/ts-style.css": "directive/ts-style.less"
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['directive/!(*.less)'], dest: '.tmp/', filter: 'isFile', flatten: true}
        ]
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'directive/**/!(*.js)'],
      tasks: ['clean', 'jshint', 'less', 'copy'],
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
          base: '.tmp',
          livereload: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'jshint', 'less', 'copy', 'connect', 'open', 'watch']);

};