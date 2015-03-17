'use strict';

services.factory('UserSvc',[
    '$timeout',
    '$http',
    'ENV',
    function($timeout, $http, ENV){

        var user = {
          list : []
        };

        user.save = function (user,callback) {
            $http.post(ENV.apiEndpoint+'/user', user)
                .success(function(response){
                    callback();
                });
        }

        user.delete = function(user, callback) {
            $http.delete(ENV.apiEndpoint+'/user/'+user._id)
                .success(function(response){
                    callback();
                });
        }

        user.edit = function(user, callback) {
            $http.put(ENV.apiEndpoint+'/user/'+user._id, user)
                .success(function(response){
                    callback();
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
