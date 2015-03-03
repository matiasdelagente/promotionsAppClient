controllers.controller('BusinessCtrl',[
    '$scope',
    '$timeout',
    'BusinessSvc',
    function($scope, $timeout, BusinessSvc){

        $scope.business = {};

        /*BusinessSvc.get(function(response){
            $scope.business.results = response
        });
*/
        $scope.form = {};

        $scope.form.show = function(){
            $scope.form.state = !$scope.form.state;
            $scope.form.type = "create"
        };

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

    }
]);
