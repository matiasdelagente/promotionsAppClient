'use strict';

services.factory('BusinessSvc',[
    '$timeout',
    '$http',
    'ENV',
    '$upload',
    function($timeout, $http, ENV, $upload){

        var business = {
          list : []
        };

        business.upload = function (business, callback) {
            business.image.upload = $upload.upload({
                url: ENV.http+'/upload',
                method: 'POST',
                file: business.image,
            });
            business.image.upload.success(function(response){
                callback(response.result)
            });
        }

        business.save = function (business, callback) {
            $http.post(ENV.http+'/business', business)
                .success(function(response){
                    callback();
                })
        }

        business.delete = function(business, callback) {
            $http.delete(ENV.http+'/business/'+business._id)
                .success(function(response){
                    callback();
                });
        }

        business.edit = function(business, callback) {
            console.log(business);
            $http.put(ENV.http+'/business/'+business._id, business)
                .success(function(response){
                    callback();
                });
        };

        business.get = function (callback) {
            $http.get(ENV.http+'/businesses')
                .success(function(response){
                    callback(response.result);
                });
        };

        business.getById = function (businessId,callback) {
            $http.get(ENV.http+'/business/'+businessId)
                .success(function(response){
                    callback(response.result);
                });
        };

        return business;

    }
])
