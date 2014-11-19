module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: ['src/dotdot.js'],
      options: {
        specs: 'test/*.spec.js',
      }
    },
    watch: {
      test: {
        files: ['src/**/*.js', 'test/**/*.spec.js'],
        tasks: ['jasmine']
      }
    },
    jshint: {
      all: ['src/**/*.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>.js - v<%= pkg.version %>\n' +
          'built on <%= grunt.template.today("yyyy-mm-dd") %> \n' +
          'repo: <%= pkg.repository.url %> \n' +
          'author: <%= pkg.author %> \n' +
          'license: <%= pkg.license %> */ \n'
      },      
      build:{
        files: {
          'dist/dotdot.min.js': ['src/dotdot.js']
        }
      }
    }      
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch'); 
  grunt.loadNpmTasks('grunt-contrib-jshint'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');    

  // Default task(s).
  grunt.registerTask('test-watch', ['watch:test']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('build', ['jasmine', 'jshint', 'uglify']);
  grunt.registerTask('default', []);

};