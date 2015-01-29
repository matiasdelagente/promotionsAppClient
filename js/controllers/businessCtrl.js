/**
 * Created by Administrador on 21/01/2015.
 */


controllers.controller('businessCtrl', ['$scope', 'Business',
	function ($scope, Business) {
        $scope.businesses = Business.getAll.query();
    }]);


controllers.controller('businessDetailCtrl', ['$scope', '$routeParams', 'Business',
  function($scope, $routeParams, Business) {
		$scope.business = Business.getOne.query({businessId:$routeParams.businessId});
        console.log($scope.business);
  }]);