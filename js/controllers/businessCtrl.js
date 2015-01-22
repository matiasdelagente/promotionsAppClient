/**
 * Created by Administrador on 21/01/2015.
 */

var businessController = angular.module('businessController', []);

businessController.controller('businessCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$http.get('http://54.94.193.127:8888/businesses/54bfd6ab25c15c5657b36b59').then(function(response) {
			$scope.businesses = response.data.result;
	});
}]);

businessController.controller('businessDetailCtrl', ['$scope', '$routeParams', '$http', 
  function($scope, $routeParams, $http) {
	$http.get('http://54.94.193.127:8888/business/'+$routeParams.businessId).then(function(response) {
		$scope.business = response.data.result;
	});
  }]);