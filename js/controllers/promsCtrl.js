controllers.controller('PromsCtrl',[
        '$scope',
        'PromotionSvc',
        'PromTypesSvc',
        'PromStatesSvc',
        function($scope, PromotionSvc, PromTypesSvc, PromStatesSvc){

        $scope.promotion = {}
        $scope.promotion.types = {}
        $scope.promotion.states = {}
        $scope.form = {}

        $scope.form.show = function(){
                $scope.form.state = !$scope.form.state;
        };

        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response;
        });

        PromStatesSvc.get(function(response){
            $scope.promotion.states.results = response;
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
