'use strict';
var fs = require('fs'),
    gruntConfig

module.exports = function (grunt) {
    var yeomanConfig = {
            source: 'static/source',
            build: 'static/build',
            tmp: 'static/tmp'
        },
        styles = fs.readdirSync(yeomanConfig.source + '/stylus/')

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

    gruntConfig = {
        yeoman: yeomanConfig,
        watch: {
            stylus: {
                files: [
                    '<%= yeoman.source %>/stylus/**/*.styl'
                ],
                tasks: 'stylus reload'
            }
        },
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.build %>/*',
                        '!<%= yeoman.build %>/.git*'
                    ]
                }]
            },
            tmp: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.tmp %>/*',
                        '!<%= yeoman.tmp %>/.git*'
                    ]
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.source %>/js/{,*/}*.js',
                '!<%= yeoman.source %>/js/{,*/}*.min.js'
            ]
        },
        concat: {
            build: {
                files: {
                    '<%= yeoman.build %>/js/scripts.js': [
                        '.tmp/js/{,*/}*.js',
                        '<%= yeoman.source %>/js/{,*/}*.{js,min.js}'
                    ]
                }
            }
        },
        cssmin: {
            build: {
                files: {}
            }
        },
        uglify: {
            build: {
                files: {
                    '<%= yeoman.build %>/scripts/scripts.js': [
                        '<%= yeoman.build %>/scripts/scripts.js'
                    ]
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.source %>',
                    dest: '<%= yeoman.build %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'components/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/fonts/*'
                    ]
                }]
            }
        },
        stylus: {
            compile: {
                options: {
                    compress: true,
                    paths: ['node_modules/grunt-contrib-stylus/node_modules']
                },
                files: {}
            }
        }
    }

    /*styles.forEach(function (name, id, array) {
        gruntConfig.stylus.compile.options.files[yeomanConfig.build + '/styles/' + name + '.css'] = yeomanConfig.source + '/styles/' + name + '/main.styl'
    })*/

    grunt.initConfig(gruntConfig)

    grunt.registerTask('test', [
        'clean',
        'karma'
    ])

    grunt.registerTask('build', [
        'clean:build',
        'jshint',
        'test',
        'coffee',
        'compass:build',
        'useminPrepare',
        'concat',
        'imagemin',
        'cssmin',
        'htmlmin',
        'copy',
        'cdnify',
        'ngmin',
        'uglify',
        'rev',
        'usemin'
    ])

    grunt.registerTask('default', ['build'])
}
