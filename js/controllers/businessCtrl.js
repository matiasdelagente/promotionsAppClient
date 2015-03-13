controllers.controller('BusinessCtrl',[
    '$scope',
    '$timeout',
    'BusinessSvc',
    'ZoneSvc',
    function($scope, $timeout, BusinessSvc, ZoneSvc){

        $scope.business = {};
        $scope.zone = {}

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
        }

        $scope.business.save = function(business){
            if($scope.form.type == "create"){
                BusinessSvc.save(business);
                $scope.business.results.push(business);
                $scope.form.state = !$scope.form.state
                $scope.business.new = {};
            }
            else{
                BusinessSvc.edit(business);
                $scope.form.state = !$scope.form.state
                $scope.business.results[$scope.business.index] = business
                $scope.business.new = {};
            }
        }

        $scope.business.editForm = function(index){
            $scope.business.index = index
            $scope.form.state = true;
            $scope.form.type = "edit";
            $scope.business.new = angular.copy($scope.business.results[index])
            if($scope.business.results[index].zone._id)$scope.business.new.zone = $scope.business.results[index].zone._id
        }

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

        ZoneSvc.get(function(response){
            $scope.zone.results = response
        })

    }
]);
