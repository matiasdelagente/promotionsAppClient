'use strict';

services.factory('ReserveSvc',[
    '$http',
    '$timeout',
    'ENV',

    function ($http, $timeout, ENV) {

        //namespace
        var reserve = {};

        reserve.get = function (callback) {

            $timeout(function(){
                var response = {
                    success:true,
                    result:[]
                };
                for(var i = 0; i < 5; i++){
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

            /*$http.post(ENV.apiEndpoint+'/login', { email: email, password: password })
                .success(function (response) {
                    if(response.code !== 200){
                        response.message = 'Email or password is incorrect';
                    }
                    callback(response.result);
                });*/
        };

        return reserve;
    }]);