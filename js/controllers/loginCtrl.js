'use strict';

controllers.controller('LoginCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    'AuthSvc',
    function ($scope, $rootScope, $location, AuthSvc) {

        AuthSvc.clearCredentials();

        $scope.login = function () {
            $scope.loading = true;
            AuthSvc.login($scope.email, $scope.password, function(response) {
                console.log(response);
                $scope.loading = false;
                if(!response.success) {
                    $scope.error = response.message;
                    return;
                }
                $rootScope.$broadcast('menu', { 'show' : true, user:response.result.user });
                if(response.result.user.role === 'admin' && response.result.user.isAdmin){
                    $location.path('/admin');
                }else{
                    $location.path('/dash');
                }
            });
        };

        $scope.register = function () {
            $scope.loading = true;
            AuthSvc.register($scope.email, $scope.password, function(response) {
                $scope.loading = false;
                if(!response.success) {
                    $scope.error = response.message;
                    return;
                }
                $rootScope.$broadcast('menu', { 'show' : true, user:response.result.user });
                if(response.result.user.role === 'admin' && response.result.user.isAdmin){
                    $location.path('/admin');
                }else{
                    $location.path('/dash');
                }
            });
        };
    }]);