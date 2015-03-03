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

        $scope.business.delete = function(index){
                //BusinessSvc.delete($scope.business.result[index]);
                $scope.business.results.splice(index,1);
                console.log(index);
        }

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

    }
]);
