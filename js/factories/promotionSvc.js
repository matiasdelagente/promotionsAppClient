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

        promotion.save = function (promotion,callback) {
            $http.post(ENV.http+'/promotion', promotion)
                .success(function(response){
                    callback()
                });
        }

        promotion.delete = function(promotion,callback) {
            $http.delete(ENV.http+'/promotion/'+promotion._id)
                .success(function(response){
                    callback();
                });
        }

        promotion.edit = function(promotion,callback) {
            $http.put(ENV.http+'/promotion/'+promotion._id, promotion)
                .success(function(response){
                    callback();
                });
        }

        promotion.get = function (businessId,callback) {
            $http.get(ENV.http+'/promotions', {params: {businessId: businessId} })
                .success(function(response){
                    callback(response.result);
            });
        };

        return promotion;
    }]);
