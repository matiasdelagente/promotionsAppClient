controllers.controller('SettingsCtrl',[
    '$scope',
    'SettingsSvc',
    function($scope, SettingsSvc, AuthSvc){
        $scope.settings = {};

        SettingsSvc.get(AuthSvc.user._id,function(response){
            $scope.settings.business = response;
        });

        $scope.settings.edit = function(){
            $scope.loading = true;
            SettingsSvc.edit($scope.settings.business,function(response){
                $scope.loading = false;
                $scope.settings.business = response;
            });
        }
    }
]);