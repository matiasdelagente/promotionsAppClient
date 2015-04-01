'use strict';

angular.module('config', [])
    .constant('ENV', {
        'name': 'development',
        'http': 'http://yapp.local:8888'
    });