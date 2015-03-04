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

            this.list.push(user);

        }

        user.delete = function() {
        }

        user.edit = function() {

        }

        user.get = function (callback) {

            $timeout(function(){
                var response = {
                    success:true,
                    result:[]
                };
                for(var i = 0; i < 2; i++){
                    var r = {
                        name:" prueba inc.",
                        negocio: {
                            name: "Ferreteria Lito"
                        }
                    };
                    response.result.push(r)
                }
                callback(response.result);
            },300);
        };

        return user;

    }
])
