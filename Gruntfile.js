"use strict";

module.exports = function (grunt) {

    grunt.initConfig({

        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8080,
                    keepalive: true,
                    debug: true
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                runnerPort: 9876,
                singleRun: true,
                browsers: ['Chrome']
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('server', [
        'connect:server'
    ]);
    grunt.registerTask('test', [
        'karma:unit'
    ]);
};