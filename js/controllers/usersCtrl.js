controllers.controller('UsersCtrl',[
    '$scope',
    '$timeout',
    'UserSvc',
    'BusinessSvc',
    'ModalService',
    function($scope, $timeout,UserSvc,BusinessSvc,ModalService){

        $scope.user = {}
        $scope.business = {}
        $scope.form = {};

        $scope.showModal = function(index){
            $scope.user.new = {};
            if(index != null){
                $scope.user.editForm(index)
            }
            ModalService.showModal({
                templateUrl: "./templates/add-user-form.html",
                controller: "ModalCtrl",
                inputs: {
                    object : $scope.user.new
                }
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    if(result != "Cancel"){
                        $scope.user.save(result);
                     }
                })
            })
        }

        $scope.user.delete = function(index){
            if(confirm("¿Seguro que quiere eliminar el usuario?")){
                UserSvc.delete($scope.user.results[index],function(){
                    UserSvc.get(function(response){
                        $scope.user.results = response
                    })
                });
            }
        }

        $scope.user.save = function(user){
            if(!user._id){
                UserSvc.save(user,function(){
                    UserSvc.get(function(response){
                        $scope.user.results = response
                    })
                });
            }
            else{
                UserSvc.edit(user, function(){
                    UserSvc.get(function(response){
                        $scope.user.results = response;
                    })
                })
            }
            $scope.user.new = {}
        }

        $scope.user.editForm = function(index){
            $scope.user.new = angular.copy($scope.user.results[index]);
            if($scope.user.new.business) $scope.user.new.business = $scope.user.results[index].business._id;
        }

        UserSvc.get(function(response){
            $scope.user.results = response
            console.log($scope.user.results)
        })

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

    }
])
