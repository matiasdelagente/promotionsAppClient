controllers.controller('DashCtrl',[
    '$scope',
    'ReserveSvc',
    'PromotionSvc',
    'AvailabilitySvc',
    'BusinessSvc',
    'PromStatesSvc',
    'AuthSvc',
    function($scope, ReserveSvc, PromotionSvc, AvailabilitySvc, BusinessSvc, PromStatesSvc, AuthSvc){

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

        BusinessSvc.get(function(response){
            $scope.business.results = response
        })

        PromStatesSvc.get(function(response){
            $scope.reserve.states.results = response;
        })

        ReserveSvc.get(function(response){
            $scope.reserve.results = response;
        });

        ReserveSvc.getSettings(function(response){
            $scope.reserve.settings.results = response;
        });

        PromotionSvc.get(AuthSvc.getUser().business,function(response){
            $scope.promotion.results = response;
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

        $scope.status.changeStatus = setStatusValue;

        function setStatusValue(){
            ReserveSvc.setSettings($scope.status.value, function(response){
                $scope.status.value = response
            })
        }


    }
]);
