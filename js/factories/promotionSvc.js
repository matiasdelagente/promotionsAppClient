'use strict';

services.factory('PromotionSvc',[
    '$http',
    '$timeout',
    'ENV',

    function ($http, $timeout, ENV) {

        //namespace
        var promotion = {};

        promotion.get = function (callback) {

            $timeout(function(){
                var response = {
                    success:true,
                    result:[]
                };
                for(var i = 0; i < 10; i++){
                    var r = {
                        code:"123456789",
                        type:'2x1',
                        expire:new Date(),
                        status:(i%2)?'Pendiente':'Cancelada',
                        date:new Date()
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

        return promotion;
    }]);