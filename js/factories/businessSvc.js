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

            business.list.push(business);

        }

        business.delete = function() {
        }

        business.edit = function() {

        }

        business.get = function (callback) {

            $timeout(function(){
                var response = {
                    success:true,
                    result:[]
                };
                for(var i = 0; i < 2; i++){
                    var r = {
                        name:" prueba inc.",
                        address: 'avenida siempre viva',
                        phone: 155123456,
                        facebook: 'facebook/prueba',
                        web: 'www.prueba.com'
                    };
                    response.result.push(r)
                }
                callback(response.result);
            },300);
        };

        return business;

    }
])
