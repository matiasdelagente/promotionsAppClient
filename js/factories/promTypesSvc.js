'use strict'

services.factory('PromTypesSvc',[
        '$http',
        '$timeout',
        "ENV",

        function($http, $timeout, ENV){

                var promTypes = {};

                promTypes.get = function(callback){

                        $timeout(function(){
                            var response = {
                                success:true,
                                result:[]
                            };

                        response.result = {
                                data: [{
                                        _id: 1,
                                        name: '2x1'
                                    },
                                    {
                                        _id: 2,
                                        name: 'Descuento'
                                    },
                                    {
                                        _id: 3,
                                        name: 'Obsequio'
                                    },
                                    {
                                        _id: 4,
                                        name: 'Otros'
                                    }

                                ]
                        };

                            callback(response.result);
                        },300);
                    };

                   return promTypes;


        }]);
