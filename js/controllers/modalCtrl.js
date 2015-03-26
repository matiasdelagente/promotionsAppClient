controllers.controller('ModalCtrl',[
    '$scope',
    'close',
    'BusinessSvc',
    'ZoneSvc',
    'CategorySvc',
    'PromStatesSvc',
    'PromTypesSvc',
    'object',
    function($scope, close, BusinessSvc, ZoneSvc, CategorySvc, PromStatesSvc, PromTypesSvc, object){

        $scope.business = {};
        $scope.zone = {};
        $scope.category = {};
        $scope.promotion = {};
        $scope.promotion.types = {};
        $scope.promotion.states = {};

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

        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response;
        });

        PromStatesSvc.get(function(response){
            $scope.promotion.states.results = response;
        })

        $scope.close = function(result){
            close(result, 300);
        }
    }
]);
