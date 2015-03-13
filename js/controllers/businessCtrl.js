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
            BusinessSvc.delete($scope.business.results[index],function(){
                BusinessSvc.get(function(response){
                    $scope.business.results = response
                })
            });
        }

        $scope.business.save = function(business){
            if($scope.form.type == "create"){
                BusinessSvc.save(business,function(){
                    BusinessSvc.get(function(response){
                        $scope.business.results = response
                    })
                });
                $scope.form.state = !$scope.form.state
                $scope.business.new = {};
            }
            else{
                BusinessSvc.edit(business,function(){
                    BusinessSvc.get(function(response){
                        $scope.business.results = response
                    })
                })
                $scope.form.state = !$scope.form.state
                //$scope.business.results[$scope.business.index] = business
                $scope.business.new = {};
            }
        }

        $scope.business.editForm = function(index){
            $scope.business.index = index
            $scope.form.state = true;
            $scope.form.type = "edit";
            $scope.business.new = angular.copy($scope.business.results[index])
            $scope.business.new.zone = $scope.business.results[index].zone._id
        }

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

        ZoneSvc.get(function(response){
            $scope.zone.results = response
        })

    }
]);
