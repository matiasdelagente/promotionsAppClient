controllers.controller('UsersCtrl',[
    '$scope',
    '$timeout',
    'UserSvc',
    function($scope, $timeout,UserSvc){

        $scope.user = {}
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
                //BusinessSvc.save(user);
                $scope.user.results.push(user);
                $scope.form.state = !$scope.form.state
                $scope.user.new = {}
            }
            else{
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
    }
])
