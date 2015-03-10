'use strict';

services.factory('UserSvc',[
    '$timeout',
    '$http',
    'ENV',
    function($timeout, $http, ENV){

        var user = {
          list : []
        };

        user.save = function (user) {
            $http.post(ENV.apiEndpoint+'/user', user)
                .success(function(response){
                    console.log(user);
                });
        }

        user.delete = function(user) {
            $http.delete(ENV.apiEndpoint+'/user'+user._id)
                .success(function(response){
                    console.log(response);
                });
        }

        user.edit = function(user) {
            $http.put(ENV.apiEndpoint+'/user'+user._id, user)
                .success(function(response){
                    console.log(response.result);
                });
        }

        user.get = function (callback) {
            $http.get(ENV.apiEndpoint+'/user')
                .success(function(response){
                    callback(response.result);
                });
        };

        return user;

    }
])
