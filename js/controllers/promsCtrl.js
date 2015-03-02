controllers.controller('PromsCtrl',[
        '$scope',
        'PromotionSvc',
        'PromTypesSvc',
        'PromStatesSvc',
        function($scope, PromotionSvc, PromTypesSvc, PromStatesSvc){

        $scope.promotion = {}
        $scope.promotion.types = {}
        $scope.promotion.states = {}
        $scope.prom = {};
        $scope.form = {};

        $scope.upload = function (files) {
            if (!files || files.length <= 0) {
                return;
            }
            $scope.file = files[0];
        };

        $scope.sendFile = function(){
                $scope.prom.file = $scope.file;
                console.log($scope.file)
        }

        $scope.form.show = function(){
                $scope.form.state = !$scope.form.state;
                $scope.form.type = "create"
        };

        $scope.promotion.delete = function(index){
                PromotionSvc.delete($scope.promotion.result[index]);
                $scope.promotion.results.splice(index,1);
                console.log(index);
        }

        $scope.save = function(prom){
                if($scope.form.type = "create"){
                        PromotionSvc.save(prom);
                        $scope.promotion.results.push(prom);
                        $scope.form.state = !$scope.form.state
                }
                else{
                        PromotionSvc.edit(prom);
                        
                }
                $scope.prom = {};
        }

        $scope.edit = function(prom){
                PromotionSvc.edit(prom);

        }

        $scope.promotion.editForm = function(index){
                PromotionSvc.edit();
                $scope.form.state = true;
                $scope.form.type = "edit";
                $scope.prom = $scope.promotion.results[index]
        }

        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response;
        });

        PromStatesSvc.get(function(response){
            $scope.promotion.states.results = response;
        })

        $scope.saveProm = function(prom){
          PromotionSvc.save(prom);
          $scope.promotion.results.push(prom);
          $scope.form.state = !$scope.form.state
          $scope.prom = {};

        }

        PromotionSvc.get(function(response){
          $scope.promotion.results = response
        });


  }])
