/*
 * grunt-link-html-2mlab
 * https://github.com/cosentino/grunt-link-html
 *
 * Copyright (c) 2013 Colin Gemmell
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('link_html_2mlab', 'link css html file', function() {

    var options = this.options({
      expand: true,
      cwd: '.'
    });

    //TODO: test this method away from the rest of the code. not sure how to do that yet.
    var includes = function(template, path, options){
      var basePath = typeof options.dest !== 'undefined' ? options.dest : '';
      var cssFiles = grunt.file.expand(options, path);
      var cssIncludes = cssFiles.map( function(file) {
        return grunt.template.process(template, {data: {file: basePath + file}});
      });
      cssIncludes.unshift('');
      cssIncludes = cssIncludes.join('\n') + '\n';
      return cssIncludes;
    };

    //TODO: test this method away from the rest of the code. not sure how to do that yet.
    var processIncludes = function(filepath, content, fileType, files) {
      var begin = content.html.match(new RegExp('<!--\\s*begin:' + fileType + '\\s*-->'));
      var skip = false;
      if (begin) {
        var end = content.html.match(new RegExp('<!--\\s*end:' + fileType + '\\s*-->')).index;
        var startReplace = begin.index + begin[0].length;
        var conditionalCommentBegin = '\n<!--[if lte IE 9]>';
        var conditionalCommentEnd = '<![endif]-->\n';
        content.html = content.html.substring(0, startReplace) + conditionalCommentBegin + files + conditionalCommentEnd + content.html.substring(end, content.html.length);
      } else {
        skip = true;
        grunt.log.ok('Skipping ' + fileType  + ' for ' + filepath);
      }
      return skip;
    };

    var cssIncludes = includes('<link rel="stylesheet" type="text/css" href="<%= file %>" />', this.data.cssFiles, options);
    var targetFiles = grunt.file.expand(options, this.data.targetHtml);        

    targetFiles.forEach(function(filepath) {
      var content = {html: grunt.file.read(options.cwd + '/' + filepath)};
      var skipCss = processIncludes(filepath, content, 'css', cssIncludes);
      if(!skipCss){
        grunt.log.ok('Writing file '+ filepath);
        grunt.file.write(options.cwd + '/' + filepath, content.html);
      }
    });    

  });

};
