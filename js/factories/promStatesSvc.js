'use strict'

services.factory('PromStatesSvc', [
        '$http',
        '$timeout',
        'ENV',

        function($http, $timeout, ENV){

                var PromStates = {}

                PromStates.get = function(callback){

                        $timeout(function(){
                            var response = {
                                success:true,
                                result:[]
                            };

                        response.result = {
                                data: [{
                                        _id: 1,
                                        name: 'Pendiente'
                                    },
                                    {
                                        _id: 2,
                                        name: 'Activa'
                                    },
                                    {
                                        _id: 3,
                                        name: 'Vencida'
                                    },
                                    {
                                        _id: 4,
                                        name: 'Otro'
                                    }

                                ]
                        };

                            callback(response.result);
                        },300);
                    };

                   return PromStates;

}])
