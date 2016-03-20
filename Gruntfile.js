module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['src/**/*.js', 'test/**/*.js']
        },

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js',
                    runnerPort: 9999
                }
            }
        },

        jasmine: {
            unittests: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/*Spec.js',
                    template: require('grunt-template-jasmine-requirejs')

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jshint', 'jasmine']);

    grunt.registerTask('default', ['test']);

};


