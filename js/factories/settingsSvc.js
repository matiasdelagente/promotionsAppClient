'use strict';

services.factory('SettingsSvc',[
    '$http',
    '$timeout',
    'ENV',
    function ($http, $timeout, ENV) {

        //namespace
        var settings = {};

        settings.get = function (callback) {
            $timeout(function(){
                var response = {
                    success:true,
                    result:{
                        amount:100
                    }
                };
                callback(response.result);
            },100);
        };

        return settings;
    }]);