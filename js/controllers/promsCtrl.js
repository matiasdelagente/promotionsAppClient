controllers.controller('PromotionCtrl',[
    '$scope',
    '$timeout',
    'PromotionSvc',
    'PromStatesSvc',
    'PromTypesSvc',
    function($scope, $timeout, PromotionSvc, PromStatesSvc,PromTypesSvc){

        $scope.promotion = {};
        $scope.zone = {};
        $scope.promotion.types = {};
        $scope.promotion.states = {};
        $scope.form = {};

        $scope.form.show = function(){
            $scope.form.state = !$scope.form.state;
            $scope.form.type = "create"
        };

        $scope.promotion.delete = function(index){
            PromotionSvc.delete($scope.promotion.results[index],function(){
                PromotionSvc.get(function(response){
                    $scope.promotion.results = response
                })
            });
        }

        $scope.promotion.save = function(promotion){
            if($scope.form.type == "create"){
                PromotionSvc.save(promotion,function(){
                    PromotionSvc.get(function(response){
                        $scope.promotion.results = response
                    })
                });
                $scope.form.state = !$scope.form.state
            }
            else{
                PromotionSvc.edit(promotion,function(){
                    PromotionSvc.get(function(response){
                        $scope.promotion.results = response
                    })
                })
                $scope.form.state = !$scope.form.state
                //$scope.promotion.results[$scope.promotion.index] = promotion
                $scope.promotion.new = {};
            }
        }

        $scope.promotion.editForm = function(index){
            $scope.promotion.index = index
            $scope.form.state = true;
            $scope.form.type = "edit";
            $scope.promotion.new = angular.copy($scope.promotion.results[index])
            console.log($scope.promotion.new);
            //$scope.promotion.new.zone = $scope.promotion.results[index].zone._id
        }

        PromotionSvc.get(function(response){
            $scope.promotion.results = response
        })

        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response;
        });

        PromStatesSvc.get(function(response){
            $scope.promotion.states.results = response;
        })

        $scope.upload2 = function (files){
            if (!files || files.length <= 0) {
                return;
            }
            $scope.file = files[0];
        };

        $scope.sendFile = function(){
            $scope.prom.file = $scope.file;
        }


  }])
