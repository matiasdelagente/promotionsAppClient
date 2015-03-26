controllers.controller('ModalCtrl',[
    '$scope',
    'close',
    'BusinessSvc',
    'ZoneSvc',
    'CategorySvc',
    'object',
    function($scope, close, BusinessSvc, ZoneSvc, CategorySvc, object){

        $scope.business = {};
        $scope.zone = {};
        $scope.category = {};

        $scope.form = angular.copy(object);

        BusinessSvc.get(function(response){
            $scope.business.results = response
        });

        ZoneSvc.get(function(response){
            $scope.zone.results = response
        });

        CategorySvc.get(function(response){
            $scope.category.results = response
        });

        

        $scope.close = function(result){
            close(result, 300);
        }
    }
]);
