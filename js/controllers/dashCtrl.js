controllers.controller('DashCtrl',[
    '$scope',
    'ReserveSvc',
    'PromotionSvc',
    'AvailabilitySvc',
    'BusinessSvc',
    function($scope, ReserveSvc, PromotionSvc, AvailabilitySvc, BusinessSvc){

        $scope.reserve = {};
        $scope.reserve.settings = {};

        $scope.dash = {};
        $scope.dash.loged = false;
        $scope.dash.isAdmin = true;

        $scope.promotion = {};
        $scope.availability = {};
        $scope.availability.editAmount = false;

        $scope.business = {};

        $scope.$on('dash',function(ev,message){
            $scope.dash.loged = message.show;
            var user = AuthSvc.user;
            if(user.role.name === 'Admin'){
                $scope.dash.isAdmin = true;
            }
        });

        BusinessSvc.get(function(response){
            $scope.business.results = response
            console.log($scope.business.results);
        })

        ReserveSvc.get(function(response){
            $scope.reserve.results = response;
        });

        ReserveSvc.getSettings(function(response){
            $scope.reserve.settings.results = response;
        });

        PromotionSvc.get(function(response){
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
    }
]);
