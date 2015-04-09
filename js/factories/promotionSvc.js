'use strict';

services.factory('PromotionSvc',[
    '$http',
    '$timeout',
    'ENV',
    '$upload',
    function ($http, $timeout, ENV, $upload) {

        //namespace
        var promotion = {
          list : []
        };

        promotion.upload = function (promotion, callback) {
            promotion.image.upload = $upload.upload({
                url: ENV.http+'/upload',
                method: 'POST',
                file: promotion.image,
            });
            promotion.image.upload.success(function(response){
                callback(response.result)
            });
        }

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
            $http.get(ENV.http+'/promotions/'+ businessId)
                .success(function(response){
                    callback(response.result);
            });
        };

        return promotion;
    }]);
