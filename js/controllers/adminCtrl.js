controllers.controller('AdminCtrl',[
    '$scope',
    'ReserveSvc',
    'PromotionSvc',
    'AvailabilitySvc',
    'BusinessSvc',
    'PromStatesSvc',
    function($scope, ReserveSvc, PromotionSvc, AvailabilitySvc, BusinessSvc, PromStatesSvc){

        $scope.reserve = {};
        $scope.reserve.settings = {};
        $scope.reserve.states = {};

        $scope.status = {};
        $scope.status.setStatus = false

        $scope.dash = {};
        $scope.dash.loged = false;
        $scope.dash.isAdmin = false;

        $scope.promotion = {};
        $scope.availability = {};
        $scope.availability.editAmount = false;

        $scope.business = {};

        $scope.$on('dash',function(ev,message){
            $scope.dash.loged = message.show;
            var user = AuthSvc.getUser();
            if(user && user.role && user.role === 'admin' && user.isAdmin){
                $scope.dash.isAdmin = true;
                console.log("dash del admin")
            }
        });

        BusinessSvc.get(function(response){
            $scope.business.results = response
            console.log($scope.business.results.length);
        })

    }
]);
