controllers.controller('PromsCtrl',[
        '$scope',
        'PromotionSvc',
        'PromTypesSvc',
        'PromStatesSvc',
        function($scope, PromotionSvc, PromTypesSvc, PromStatesSvc){

        $scope.promotion = {}
        $scope.promotion.types = {}
        $scope.promotion.states = {}


        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response;
        });

        PromStatesSvc.get(function(response){
            $scope.promotion.states.results = response;
            console.log(response)
        })

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
