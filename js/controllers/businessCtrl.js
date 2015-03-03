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

        $scope.business.save = function(business){
            if($scope.form.type == "create"){
                //BusinessSvc.save(business);
                $scope.business.results.push(business);
                $scope.form.state = !$scope.form.state
                console.log("tito")
            }
            else{
                console.log($scope.business.index)
                $scope.form.state = !$scope.form.state
                $scope.business.results[$scope.business.index] = business
            }

        }

        $scope.business.editForm = function(index){
            $scope.business.index = index
            $scope.form.state = true;
            $scope.form.type = "edit";
            $scope.business.new = $scope.business.results[index]
        }

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

    }
]);
