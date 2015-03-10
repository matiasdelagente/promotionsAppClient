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
            $http.post(ENV.apiEndpoint+'/business', business)
                .success(function(response){
                    console.log(business);
                });
        }

        business.delete = function(business) {
            $http.delete(ENV.apiEndpoint+'/business/'+business._id)
                .success(function(response){
                    console.log(ENV.apiEndpoint+'/business/'+business._id);
                });
        }

        business.edit = function(business) {
            $http.put(ENV.apiEndpoint+'/business/'+business._id, business)
                .success(function(response){
                    console.log(response.result);
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
