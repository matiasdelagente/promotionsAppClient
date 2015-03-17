controllers.controller('DashCtrl',[
    '$scope',
    'ReserveSvc',
    'PromotionSvc',
    'AvailabilitySvc',
    function($scope, ReserveSvc, PromotionSvc, AvailabilitySvc){

        $scope.reserve = {};
        $scope.reserve.settings = {};

        $scope.promotion = {};
        $scope.availability = {};
        $scope.availability.editAmount = false;

        ReserveSvc.get(function(response){
            $scope.reserve.results = response;
        });

        ReserveSvc.getSettings(function(response){
            $scope.reserve.settings.results = response;
        });

        PromotionSvc.get(function(response){
            $scope.promotion.results = response;
            console.log($scope.promotion.results);
        });

        AvailabilitySvc.get(function(response){
            $scope.availability.results = response;
        });

        $scope.reserve.settings.plus = function(){
            $scope.reserve.settings.results.timeOut+=60000;
            setTimeOutReserve();
        };

        $scope.reserve.settings.minus = function(){
            $scope.reserve.settings.results.timeOut-=60000;
            setTimeOutReserve();
        };

        $scope.availability.plus = function(){
            $scope.availability.results.amount+=1;
            setAmountAvailability();
        };

        $scope.availability.minus = function(){
            console.log($scope.reserve.settings);
            $scope.availability.results.amount-=1;
            setAmountAvailability();
        };

        $scope.availability.changeAmount = setAmountAvailability;

        function setAmountAvailability(){
            AvailabilitySvc.setAmount($scope.availability.results.amount,function(response){
                $scope.availability.results = response;
            });
        }

        function setTimeOutReserve(){
            ReserveSvc.setSettings($scope.reserve.settings.results,function(response){
                $scope.reserve.settings.results = response;
            });
        }
    }
]);
