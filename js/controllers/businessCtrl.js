controllers.controller('BusinessCtrl',[
    '$scope',
    '$timeout',
    'BusinessSvc',
    'ZoneSvc',
    'CategorySvc',
    'ModalService',
    function($scope, $timeout, BusinessSvc, ZoneSvc, CategorySvc, ModalService){

        $scope.business = {};
        $scope.zone = {};
        $scope.category = {};

        $scope.showModal = function(index){
            if(index != null){
                $scope.business.editForm(index)
            }
            ModalService.showModal({
                templateUrl: "./templates/add-business-form.html",
                controller: "ModalCtrl",
                inputs: {
                    object : $scope.business.new
                }
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    if(result != "Cancel"){
                        $scope.business.save(result);
                     }
                })
            })
        }

        $scope.business.delete = function(index){
            BusinessSvc.delete($scope.business.results[index],function(){
                BusinessSvc.get(function(response){
                    $scope.business.results = response
                })
            });
        }

        $scope.business.save = function(business){
            if(!business._id){
                BusinessSvc.save(business,function(){
                    BusinessSvc.get(function(response){
                        $scope.business.results = response
                    })
                });
            }
            else{
                BusinessSvc.edit(business,function(){
                    BusinessSvc.get(function(response){
                        $scope.business.results = response
                    })
                })
            }
            $scope.business.new = {};
        }

        $scope.business.editForm = function(index){
            $scope.business.new = angular.copy($scope.business.results[index])
            $scope.business.new.zone = $scope.business.results[index].zone._id
            $scope.business.new.category = $scope.business.results[index].category._id
        }

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

        ZoneSvc.get(function(response){
            $scope.zone.results = response
        })

        CategorySvc.get(function(response){
            $scope.category.results = response
        })

    }
]);
