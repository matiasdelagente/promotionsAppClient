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
        $scope.reserve.settings.results = {};
        $scope.reserve.states = {};
        $scope.reserve.new = {}

        $scope.status = {};
        $scope.status.setStatus = false

        $scope.dash = {};
        $scope.dash.loged = false;
        $scope.dash.isAdmin = false;

        $scope.promotion = {};
        $scope.availability = {};
        $scope.availability.results = {};
        $scope.availability.editAmount = false;

        $scope.business = {};
        $scope.zone = {};
        $scope.category = {};

        //Get business, availability, timeOut and properties id's properties of the business
        BusinessSvc.getById(AuthSvc.getUser().business,function(response){
            $scope.business = response
            if(response.zone)$scope.business.zone = response.zone._id;
            if(response.category)$scope.business.category = response.category._id;
            $scope.reserve.settings.results.timeOut = response.reserveExpireTime;
            $scope.availability.results.amount = response.dispo
        })

        PromStatesSvc.get(function(response){
            $scope.reserve.states.results = response;
        })

        ReserveSvc.get(AuthSvc.getUser().business,function(response){
            $scope.reserve.results = response;
        });

        PromotionSvc.get(AuthSvc.getUser().business,function(response){
            $scope.promotion.results = response;
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
            $scope.business.dispo = $scope.availability.results.amount;
            BusinessSvc.edit($scope.business,function(response){
                //$scope.availability.results = response;
            });
        }

        function setTimeOutReserve(){
            $scope.business.reserveExpireTime = $scope.reserve.settings.results.timeOut;
            BusinessSvc.edit($scope.business,function(response){
                //$scope.reserve.settings.results = response;
            });
        }

        $scope.status.changeStatus = setStatusValue;

        function setStatusValue(){
            $scope.reserve.new.status = $scope.status.value
            ReserveSvc.setSettings($scope.reserve.new, function(response){
                //$scope.status.value = response
            })
        }


    }
]);
