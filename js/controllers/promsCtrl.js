controllers.controller('PromotionCtrl',[
    '$scope',
    '$timeout',
    'PromotionSvc',
    'PromStatesSvc',
    'PromTypesSvc',
    'CategorySvc',
    'ModalService',
    'AuthSvc',
    'SettingsSvc',
    'ENV',
    function($scope, $timeout, PromotionSvc, PromStatesSvc, PromTypesSvc, CategorySvc, ModalService, AuthSvc, SettingsSvc, ENV){

        $scope.promotion = {};
        $scope.zone = {};
        $scope.promotion.types = {};
        $scope.promotion.states = {};
        $scope.promotion.category = {};
        $scope.business = {};

        $scope.showModal = function(index){
            $scope.promotion.new = {};
            if(index != null){
                $scope.promotion.editForm(index)
            }
            ModalService.showModal({
                templateUrl: "./templates/add-promotion-form.html",
                controller: "ModalCtrl",
                inputs: {
                    object : $scope.promotion.new
                }
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    if(result != "Cancel"){
                        $scope.promotion.save(result);
                     }
                })
            })
        }

        $scope.promotion.delete = function(index){
            if(confirm("¿Seguro que quiere eliminar la promocion?")){
                PromotionSvc.delete($scope.promotion.results[index],function(){
                    PromotionSvc.get(AuthSvc.getUser().business,function(response){
                        $scope.promotion.results = response
                    })
                });
            }
        };

        $scope.promotion.save = function(promotion){
            promotion.business = $scope.business._id;
            promotion.category = $scope.business.category._id;
            promotion.zone = $scope.business.zone._id;
            if(!promotion._id){
                PromotionSvc.upload(promotion,function(path){
                    promotion.image = ENV.http + "/" + path;
                    PromotionSvc.save(promotion,function(){
                        PromotionSvc.get(AuthSvc.getUser().business,function(response){
                            $scope.promotion.results = response;
                        });
                    });
                });
            }
            else{
                PromotionSvc.upload(promotion,function(path){
                    promotion.image = ENV.http + "/" + path;
                    PromotionSvc.edit(promotion,function(){
                        PromotionSvc.get(AuthSvc.getUser().business,function(response){
                            $scope.promotion.results = response;
                        });
                    });
                }) ;
            }
            $scope.promotion.new = {};
        };

        $scope.promotion.editForm = function(index){
            $scope.promotion.new = angular.copy($scope.promotion.results[index])
            //Abajo convertimos los Date de string a object para Angular
            if($scope.promotion.new.expire) $scope.promotion.new.expire = new Date($scope.promotion.results[index].expire)
        }

        PromotionSvc.get(AuthSvc.getUser().business,function(response){
            $scope.promotion.results = response
        })

        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response;
        });

        PromStatesSvc.get(function(response){
            $scope.promotion.states.results = response;
        })

        CategorySvc.get(function(response){
            $scope.promotion.category.results = response;
        })

        SettingsSvc.get(AuthSvc.getUser().business,function(response){
            if(response.code !== 200){
                return;
            }
            $scope.business = response.result
        });

  }])
