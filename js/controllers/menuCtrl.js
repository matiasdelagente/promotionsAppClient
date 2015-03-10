'use strict';

controllers.controller('MenuCtrl',[
    '$scope',
    'AuthSvc',
    function ($scope,AuthSvc) {

        $scope.menu = {};
        $scope.menu.loged = false;
        $scope.menu.isAdmin = true;

        $scope.$on('menu',function(ev,message){
            $scope.menu.loged = message.show;
            var user = AuthSvc.user;
            if(user.role.name === 'Admin'){
                $scope.menu.isAdmin = true;
            }
        });
    }]);
