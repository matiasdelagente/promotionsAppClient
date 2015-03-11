controllers.controller('UsersCtrl',[
    '$scope',
    '$timeout',
    'UserSvc',
    'BusinessSvc',
    function($scope, $timeout,UserSvc,BusinessSvc){

        $scope.user = {}
        $scope.business = {}
        $scope.form = {};

        $scope.form.show = function(){
            $scope.form.state = !$scope.form.state;
            $scope.form.type = "create"
            $scope.user.new = {};
        };

        $scope.user.delete = function(index){
            UserSvc.delete($scope.user.results[index]);
            $scope.user.results.splice(index,1);
        }

        $scope.user.save = function(user){
            if($scope.form.type == "create"){
                UserSvc.save(user);
                $scope.user.results.push(user);
                $scope.form.state = !$scope.form.state
                $scope.user.new = {}
            }
            else{
                UserSvc.edit(user)
                $scope.form.state = !$scope.form.state
                $scope.user.results[$scope.user.index] = user
                $scope.user.new = {}
            }

        }

        $scope.user.editForm = function(index){
            $scope.user.index = index
            $scope.form.state = true;
            $scope.form.type = "edit";
            console.log($scope.user.new)
            $scope.user.new = angular.copy($scope.user.results[index]);
        }

        UserSvc.get(function(response){
            $scope.user.results = response
        })

        BusinessSvc.get(function(response){
            $scope.business.results = response
            console.log(response)
        })

    }
])
