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
                        amount:100,
                        timeOut:3000000
                    }
                };
                callback(response.result);
            },100);

            /*$http.post(ENV.apiEndpoint+'/login', { email: email, password: password })
             .success(function (response) {
             if(response.code !== 200){
             response.message = 'Email or password is incorrect';
             }
             callback(response.result);
             });*/
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

            /*$http.post(ENV.apiEndpoint+'/login', { email: email, password: password })
             .success(function (response) {
             if(response.code !== 200){
             response.message = 'Email or password is incorrect';
             }
             callback(response.result);
             });*/
        };

        return availability;
    }]);