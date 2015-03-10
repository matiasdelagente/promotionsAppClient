'use strict';

services.factory('PromotionSvc',[
    '$http',
    '$timeout',
    'ENV',

    function ($http, $timeout, ENV) {

        //namespace
        var promotion = {
          list : []
        };

        promotion.save = function (promotion) {
            $http.post(ENV.apiEndpoint+'/promotion', promotion)
                .success(function(response){
                    console.log(promotion);
                });
        }

        promotion.delete = function(promotion) {
            $http.delete(ENV.apiEndpoint+'/promotion'+promotion._id)
                .success(function(response){
                    console.log(response);
                });
        }

        promotion.edit = function(promotion) {
            $http.put(ENV.apiEndpoint+'/promotions'+promotion._id, promotion)
                .success(function(response){
                    console.log(response.result);
                });
        }

        promotion.get = function (callback) {
            $http.get(ENV.apiEndpoint+'/promotions')
                .success(function(response){
                    callback(response.result);
                });
        };

        return promotion;
    }]);
