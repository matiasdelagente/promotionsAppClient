'use strict';

controllers.controller('LoginCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    'AuthSvc',
    function ($scope, $rootScope, $location, AuthSvc) {

        AuthSvc.ClearCredentials();

        $scope.login = function () {
            $scope.loading = true;
            AuthSvc.Login($scope.email, $scope.password, function(response) {
                $scope.loading = false;
                if(response.message) {
                    $scope.error = response.message;
                    return;
                }
                AuthSvc.SetCredentials(response,$scope.password);
                $rootScope.$broadcast('menu', { 'show' : true });
                if(response.role.name === 'Admin'){
                    $location.path('/admin');
                }else{
                    $location.path('/dash');
                }
            });
        };
    }]);