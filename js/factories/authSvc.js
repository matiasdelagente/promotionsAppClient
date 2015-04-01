'use strict';

services.factory('AuthSvc',[
    'Base64',
    '$http',
    '$cookieStore',
    '$rootScope',
    '$timeout',
    'ENV',

    function (Base64, $http, $cookieStore, $rootScope, $timeout, ENV) {
        $rootScope.globals = $rootScope.globals || {};
        var service = {};
        var token = (localStorage.getItem('token'))?localStorage.getItem('token'):null;
        var user = null;

        /**
         * Login and set credentials
         * @method login
         * @param email
         * @param password
         * @param callback
         */
        service.login = function (email, password, callback) {
            var data = {
                email:email,
                password:password
            };
            $http.post(ENV.http+'/login',data).success(function(response){
                response.success = true;
                if(response.code !== 200){
                    response.success = false;
                    response.message = "El email o password es incorrecto";
                }
                user = response.result.user;
                service.setCredentials(response.result);
                callback(response);
            });
        };

        /**
         * Make an automatic login when user refresh
         * @method autoLogin
         */
        service.autoLogin = function(callback){
            if(!token)return;
            $http.post(ENV.http+'/autologin',{token:service.getCredentials()}).success(function(response){
                response.success = true;
                if(response.code !== 200){
                    response.success = false;
                }
                user = response.result.user;
                service.setCredentials(response.result);
                callback(response);
            });
        };

        /**
         * Register and set credentials
         * @method register
         * @param email
         * @param password
         * @param callback
         */
        service.register = function (email, password, callback) {
            var data = {
                email:email,
                password:password
            };
            $http.post(ENV.http+'/register',data).success(function(response){
                response.success = true;
                if(response.code !== 200){
                    response.success = false;
                    response.message = "El email o password es incorrecto";
                }
                user = response.result.user;
                service.setCredentials(response.result);
                callback(response);
            });
        };

        /**
         * Set Credentials
         * @method setCredentials
         * @param result
         */
        service.setCredentials = function (result) {
            localStorage.setItem('token',result.token);
            token = result.token;
            $rootScope.globals.token = service.getCredentials();
        };

        /**
         * Delete all credentials and users things of services
         * @method clearCredentials
         */
        service.clearCredentials = function () {
            localStorage.removeItem('token');
            user = null;
            token = null;
        };

        /**
         * Get from auth service de credential token
         * @method getCredentials
         * @returns {*}
         */
        service.getCredentials = function(){
            return token;
        };

        /**
         * Get user object
         * @method getUser
         * @returns {*}
         */
        service.getUser = function(){
            return user;
        };

        return service;
    }]);