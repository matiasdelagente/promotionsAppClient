controllers.controller('PromsCtrl',[
        '$scope',
        'PromotionSvc',
        'PromTypesSvc',
        function($scope, PromotionSvc, PromTypesSvc){

        $scope.promotion = {}
        $scope.promotion.types = {}

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

        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response;
        });

        $scope.saveProm = function(prom){
          PromotionSvc.save(prom);
          PromotionSvc.all(function(response){
                $scope.promotion.results = response
          });

        }

        PromotionSvc.get(function(response){
          $scope.promotion.results = response
        });


  }])
