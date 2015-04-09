'use strict';

services.factory('ReserveSvc',[
    '$http',
    '$timeout',
    'ENV',

    function ($http, $timeout, ENV) {

        //namespace
        var reserve = {};

        reserve.get = function (businessId,callback) {
            $http.get(ENV.http+'/reserves', {params: {businessId: businessId} })
                .success(function(response){
                    callback(response.result);
                });
        };
        /*
        reserve.get = function (callback) {
            $timeout(function(){
                var response = {
                    success:true,
                    result:[]
                };
                for(var i = 0; i < 2; i++){
                    var r = {
                        device:"123456789",
                        amount:Math.floor((Math.random() * 10) + 1),
                        timeOut:Math.floor((Math.random() * 3000000) + 1),
                        status:(i%2)?'Pendiente':'Cancelada'
                    };
                    response.result.push(r)
                }
                callback(response.result);
            },300);
        };
        */
        reserve.getSettings = function (callback) {
            $timeout(function(){
                var response = {
                    success:true,
                    result:{
                        timeOut:300000
                    }
                };
                callback(response.result);
            },300);
        };

        reserve.setSettings = function(reserve,callback){
            console.log(reserve);
            $http.put(ENV.http+'/reserve/'+reserve._id, reserve)
                .success(function(response){
                    callback();
                });
        }

        reserve.setSettings1 = function (settings,callback) {
            $timeout(function(){
                var response = {
                    success:true,
                    result:settings
                };
                callback(response.result);
            },300);
        };

        return reserve;
    }]);
