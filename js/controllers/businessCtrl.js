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
            BusinessSvc.delete($scope.business.results[index]);
            $scope.business.results.splice(index,1);
            console.log(index);
        }

        $scope.save = function(business){
            if($scope.form.type = "create"){
                //BusinessSvc.save(business);
                $scope.business.results.push(business);
                $scope.form.state = !$scope.form.state
            }
            else{
                //BusinessSvc.edit(business);
            }

                $scope.business.new = {};
        }

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

    }
]);
