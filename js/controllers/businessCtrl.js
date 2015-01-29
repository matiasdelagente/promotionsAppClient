/**
 * Created by Administrador on 21/01/2015.
 */


controllers.controller('businessCtrl', ['$scope', 'Business',
	function ($scope, Business) {
        $scope.businesses = Business.getAll.query();
    }]);


/*controllers.controller('businessDetailCtrl', ['$scope', '$routeParams', 'Business',
  function($scope, $routeParams, Business) {
		$scope.business = Business.getOne.query({businessId:$routeParams.businessId});
        console.log($scope.business);
  }]);*/

controllers.controller('businessDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('http://54.94.193.127:8888/business/'+$routeParams.businessId).then(function(response) {
            $scope.business = response.data.result;
        });
    }]);