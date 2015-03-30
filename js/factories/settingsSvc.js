'use strict';

services.factory('SettingsSvc',[
    '$http',
    '$timeout',
    'ENV',
    function ($http, $timeout, ENV) {

        //namespace
        var settings = {};

        settings.get = function (id, callback) {
            $http.get(ENV.apiEndpoint+'/user')
                .success(function(response){
                    callback(response.result[0]);
                });
        };

        return settings;
    }]);
