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
    }    
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch'); 
  grunt.loadNpmTasks('grunt-contrib-jshint');   

  // Default task(s).
  grunt.registerTask('test-watch', ['watch:test']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('build', ['jasmine', 'jshint']);
  grunt.registerTask('default', []);

};