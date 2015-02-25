'use strict'

services.factory('PromTypesSvc',[
        '$http',
        '$timeout',
        "ENV",

        function($http, $timeout, ENV){

                var promTypesSvc = {};

                promTypesSvc.get = function(callback){

                        $timeout(function(){
                            var response = {
                                success:true,
                                result:[]
                            };

                        response.result = {
                                data: [{
                                        id: 1,
                                        nombre: '2x1'
                                    },
                                    {
                                        id: 2,
                                        nombre: 'Descuento'
                                    },
                                    {
                                        id: 3,
                                        nombre: 'Obsequio'
                                    },
                                    {
                                        id: 4,
                                        nombre: 'Otros'
                                    }

                                ]
                        };

                            callback(response.result);
                        },300);
                    };

                   return promTypesSvc;


        }]);
