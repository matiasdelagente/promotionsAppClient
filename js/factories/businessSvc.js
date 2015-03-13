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
            $http.post(ENV.apiEndpoint+'/business', business)
                .success(function(response){
                    callback();
                })
        }

        business.delete = function(business, callback) {
            $http.delete(ENV.apiEndpoint+'/business/'+business._id)
                .success(function(response){
                    callback();
                });
        }

        business.edit = function(business, callback) {
            $http.put(ENV.apiEndpoint+'/business/'+business._id, business)
                .success(function(response){
                    callback();
                });
        }

        business.get = function (callback) {
            $http.get(ENV.apiEndpoint+'/businesses')
                .success(function(response){
                    callback(response.result);
                });
        };

        return business;

    }
])
