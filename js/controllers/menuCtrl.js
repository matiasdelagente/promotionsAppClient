'use strict';

controllers.controller('MenuCtrl',[
    '$scope',
    'AuthSvc',
    function ($scope,AuthSvc) {

        $scope.menu = {};
        $scope.menu.loged = false;
        $scope.menu.isAdmin = false;

        $scope.$on('menu',function(ev,message){
            $scope.menu.loged = message.show;
            var user = AuthSvc.getUser();
            if(user && user.role && user.role === 'admin' && user.isAdmin){
                $scope.menu.isAdmin = true;
            }
        });
    }]);
