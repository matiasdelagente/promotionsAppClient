controllers.controller('PromsCtrl',[
        '$scope',
        'PromotionSvc',
        function($scope, PromotionSvc){

        $scope.promotion = {}

        //TEMPORAL HASTA QUE SE COMPLETE LA API
        $scope.tipos = {
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

        $scope.estado = {
                data: [{
                        id: 1,
                        nombre: 'Pendiente'
                    },
                    {
                        id: 2,
                        nombre: 'Activa'
                    },
                    {
                        id: 3,
                        nombre: 'Vencida'
                    },
                    {
                        id: 4,
                        nombre: 'Otro'
                    }

                ]
        };

        $scope.saveProm = function(prom){
          PromotionSvc.save(prom);
          PromotionSvc.all(function(response){
            $scope.promotion.results = response
            console.log ('hola')
          });

        }

        PromotionSvc.all(function(response){
          $scope.promotion.results = response
        });

  }])
