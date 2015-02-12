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
                for(var i = 0; i < 2; i++){
                    var r = {
                        code:"123456789",
                        type:'2x1',
                        expire:new Date(),
                        status:'Pendiente',
                        date:new Date()
                    };
                    response.result.push(r)
                }
                callback(response.result);
            },300);
        };

        return promotion;
    }]);