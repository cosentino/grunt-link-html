/*
 * grunt-link-html-2mlab
 * https://github.com/cosentino/grunt-link-html
 *
 * Copyright (c) 2013 Colin Gemmell
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    link_html_2mlab: {
      development: {
        cssFiles: ['*.css'],
        targetHtml: ['*.html'],
        options: {
          expand: true,
          cwd: 'test/fixtures'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'link_html_2mlab', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
