'use strict';

services.factory('BusinessSvc',[
    '$timeout',
    '$http',
    'ENV',
    function($timeout, $http, ENV){

        var business = {
          list : []
        };

        business.save = function (business, callback) {
            console.log(business);
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
            console.log("editando")
            $http.put(ENV.http+'/business/'+business._id, business)
                .success(function(response){
                    callback();
                });
        }

        business.get = function (callback) {
            $http.get(ENV.http+'/businesses')
                .success(function(response){
                    callback(response.result);
                });
        };

        return business;

    }
])
