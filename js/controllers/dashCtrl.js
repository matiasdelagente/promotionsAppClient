controllers.controller('DashCtrl',[
    '$scope',
    'ReserveSvc',
    'PromotionSvc',
    'AvailabilitySvc',
    function($scope, ReserveSvc, PromotionSvc, AvailabilitySvc){

        $scope.reserve = {};
        $scope.promotion = {};
        $scope.availability = {};
        $scope.availability.editAmount = false;

        ReserveSvc.get(function(response){
            $scope.reserve.results = response;
        });

        PromotionSvc.get(function(response){
            $scope.promotion.results = response;
        });

        AvailabilitySvc.get(function(response){
            $scope.availability.results = response;
        });

        $scope.availability.plus = function(){
            $scope.availability.results.amount+=1;
            setAmountAvailability();
        };

        $scope.availability.minus = function(){
            $scope.availability.results.amount-=1;
            setAmountAvailability();
        };

        $scope.availability.changeAmount = function(){
            setAmountAvailability();
        };

        function setAmountAvailability(){
            AvailabilitySvc.setAmount($scope.availability.results.amount,function(response){
                $scope.availability.results = response;
            });
        }
    }
]);