'use strict';

services.factory('ZoneSvc',[
    '$timeout',
    '$http',
    'ENV',
    function($timeout, $http, ENV){

        var zone = {
          list : []
        };

        zone.save = function (zone) {
            $http.post(ENV.http+'/zone', zone)
                .success(function(response){
                    console.log(zone);
                });
        }

        zone.get = function (callback) {
            $http.get(ENV.http+'/zone')
                .success(function(response){
                    callback(response.result);
                });
        };

        return zone;

    }
])
