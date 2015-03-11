'use strict';

services.factory('BusinessSvc',[
    '$timeout',
    '$http',
    'ENV',
    function($timeout, $http, ENV){

        var business = {
          list : []
        };

        business.save = function (business) {
            console.log(business)
            $http.post(ENV.apiEndpoint+'/business', business)
                .success(function(response){
                });
        }

        business.delete = function(business) {
            $http.delete(ENV.apiEndpoint+'/business/'+business._id)
                .success(function(response){
                });
        }

        business.edit = function(business) {
            $http.put(ENV.apiEndpoint+'/business/'+business._id, business)
                .success(function(response){
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
