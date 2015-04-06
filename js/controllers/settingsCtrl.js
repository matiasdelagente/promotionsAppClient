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

        $scope.showModal = function(){
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

            SettingsSvc.get(AuthSvc.getUser().business,function(response){
                if(response.code !== 200){
                    return;
                }
                $scope.business.new = response.result
            });

        $scope.settings.save = function(business){
            BusinessSvc.edit(business,function(){
                SettingsSvc.get(AuthSvc.getUser().business,function(response){
                    if(response.code !== 200){
                        return;
                    }
                    $scope.business.new = response.result
                });
            });
            $scope.business.new = {};
        };

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
