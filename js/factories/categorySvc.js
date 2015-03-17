'use strict';

services.factory('CategorySvc',[
    '$timeout',
    '$http',
    'ENV',
    function($timeout, $http, ENV){

        var category = {
          list : []
        };

        category.save = function (category) {
            $http.post(ENV.apiEndpoint+'/category', category)
                .success(function(response){
                    console.log(category);
                });
        }

        category.get = function (callback) {
            $http.get(ENV.apiEndpoint+'/category')
                .success(function(response){
                    callback(response.result);
                });
        };

        return category;

    }
])
