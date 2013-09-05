module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    less: {
      options: {
        yuicompress: true
      },
      files: {
        expand: true,
        cwd: 'public/less',
        src: '*.less',
        dest: 'public/css',
        ext: '.css'
      }
    },
    watch: {
      scripts: {
        files: ['public/less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      reload: {
        options: {
          livereload: true
        },
        files: ['views/*.ejs']
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
//  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['less', 'watch']);

};