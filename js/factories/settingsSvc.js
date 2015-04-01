'use strict';

services.factory('SettingsSvc',[
    '$http',
    '$timeout',
    'ENV',
    function ($http, $timeout, ENV) {

        //namespace
        var settings = {};

        settings.get = function (id, callback) {
            $http.get(ENV.http+'/user')
                .success(function(response){
                    response.success = true;
                    if(response.code !== 200){
                        response.success = false;
                    }
                    callback(response);
                });
        };

        return settings;
    }]);
