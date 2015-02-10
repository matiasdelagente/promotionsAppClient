'use strict';

services.factory('AuthSvc',[
    'Base64',
    '$http',
    '$cookieStore',
    '$rootScope',
    '$timeout',
    'ENV',

    function (Base64, $http, $cookieStore, $rootScope, $timeout, ENV) {

        var service = {};
        service.user = ($cookieStore.get('globals'))?$cookieStore.get('globals').currentUser:{};

        service.Login = function (email, password, callback) {

            $timeout(function(){
                //var user = {success:true,result:{email:'cmarrero01@gmail.com',role:{name:"Admin"}}};
                var user = {success:true,result:{email:'business@gmail.com',role:{name:"Business"}}};
                if(!user.success){
                    user.message = 'Email or password is incorrect';
                }
                service.user = user.result;
                callback(user.result);
            },500);

            /*$http.post(ENV.apiEndpoint+'/login', { email: email, password: password })
                .success(function (response) {
                    if(response.code !== 200){
                        response.message = 'Email or password is incorrect';
                    }
                    callback(response.result);
                });*/
        };

        service.SetCredentials = function (response, password) {
            var authData = Base64.encode(response.email + ':' + password);
            response.authdata = authData;

            $rootScope.globals = {
                currentUser: response
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authData; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        service.GetCredentials = function(){
            return $cookieStore.get('globals');
        };

        return service;
    }]);