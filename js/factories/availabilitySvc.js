'use strict';

services.factory('AvailabilitySvc',[
    '$http',
    '$timeout',
    'ENV',
    function ($http, $timeout, ENV) {

        //namespace
        var availability = {};

        availability.get = function (callback) {
            $timeout(function(){
                var response = {success:true,
                    result:{
                        amount:100
                    }
                };
                callback(response.result);
            },100);
        };

        availability.setAmount = function (amount,callback) {
            $timeout(function(){
                var response = {success:true,
                    result:{
                        amount:amount
                    }
                };
                callback(response.result);
            },100);
        };

        return availability;
    }]);