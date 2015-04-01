controllers.controller('SettingsCtrl',[
    '$scope',
    'SettingsSvc',
    'AuthSvc',
    'ZoneSvc',
    'BusinessSvc',
    'ModalService',
    function($scope, SettingsSvc, AuthSvc, ZoneSvc, BusinessSvc, ModalService){
        $scope.settings = {};
        $scope.zone = {};
        $scope.business = {};

        $scope.showModal = function(index){
            if(index != null){
                $scope.settings.editForm(index)
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
                        $scope.settings.save(result);
                     }
                })
            })
        };

        $scope.settings.editForm = function(index){
            $scope.business.new = angular.copy($scope.settings.results[index])
            $scope.business.new.zone = $scope.settings.results[index].zone._id;
            $scope.business.new.category = $scope.settings.results[index].category._id;
        }

        $scope.settings.save = function(business){
            BusinessSvc.edit(business,function(){
                BusinessSvc.get(function(response){
                    $scope.business.results = response
                })
            });
            $scope.business.new = {};
        };

        //TODO: Revisar esto
        SettingsSvc.get(AuthSvc.getUser()._id,function(response){
            if(response.code !== 200){
                return;
            }
            $scope.settings.business = response.result.business;
            $scope.settings.business.zone = response.result.business.zone._id
            $scope.settings.business.category = response.result.business.category._id
        });

        BusinessSvc.get(function(response){
            $scope.settings.results = response
        });

        $scope.settings.edit = function(){
            $scope.loading = true;
            SettingsSvc.edit($scope.settings.business,function(response){
                $scope.loading = false;
                $scope.settings.business = response;
            });
        }

        ZoneSvc.get(function(response){
            $scope.zone.results = response
        });
    }
]);
