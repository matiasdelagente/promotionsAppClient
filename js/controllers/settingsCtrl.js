controllers.controller('SettingsCtrl',[
    '$scope',
    'SettingsSvc',
    'AuthSvc',
    'ZoneSvc',
    'BusinessSvc',
    'ModalService',
    'ENV',
    function($scope, SettingsSvc, AuthSvc, ZoneSvc, BusinessSvc, ModalService, ENV){
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
            if(response.result.zone) $scope.business.new.zone = response.result.zone._id
            if(response.result.category) $scope.business.new.category = response.result.category._id
        });

        $scope.settings.save = function(business){
            BusinessSvc.upload(business,function(path){
                business.image = ENV.http + "/" + path;
                BusinessSvc.edit(business,function(){
                    SettingsSvc.get(AuthSvc.getUser().business,function(response){
                        if(response.code !== 200){
                            return;
                        }
                        $scope.business.new = response.result
                        if(response.result.zone) $scope.business.new.zone = response.result.zone._id
                        if(response.result.category) $scope.business.new.category = response.result.category._id
                    });
                });
            });
            $scope.business.new = {};
        };

    }
]);
