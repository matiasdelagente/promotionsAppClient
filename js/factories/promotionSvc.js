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
            $http.post(ENV.apiEndpoint+'/promotion', promotion)
                .success(function(response){
                    callback()
                });
        }

        promotion.delete = function(promotion,callback) {
            $http.delete(ENV.apiEndpoint+'/promotion/'+promotion._id)
                .success(function(response){
                    callback();
                });
        }

        promotion.edit = function(promotion,callback) {
            $http.put(ENV.apiEndpoint+'/promotion/'+promotion._id, promotion)
                .success(function(response){
                    callback();
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
