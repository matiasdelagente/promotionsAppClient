controllers.controller('UsersCtrl',[
    '$scope',
    '$timeout',
    'UserSvc',
    function($scope, $timeout, UserSvc){

        $scope.user = {}
        $scope.form = {};

        $scope.form.show = function(){
            $scope.form.state = !$scope.form.state;
            $scope.form.type = "create"
        };

        $scope.user.delete = function(index){
            UserSvc.delete($scope.user.results[index]);
            $scope.user.results.splice(index,1);
        }

        $scope.user.editForm = function(index){
            $scope.user.index = index
            $scope.form.state = true;
            $scope.form.type = "edit";
            $scope.user.new = $scope.user.results[index]
        }

        UserSvc.get(function(response){
            $scope.user.results = response
        })
    }
])
