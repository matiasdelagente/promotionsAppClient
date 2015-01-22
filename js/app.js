/**
 * Created by Administrador on 21/01/2015.
 */
var ya = angular.module('ya', [
  'ngRoute',
  'businessController'
]);

ya.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/business', {
        templateUrl: 'views/business.html',
        controller: 'businessCtrl'
      }).
      when('/business/:businessId', {
        templateUrl: 'views/businessItem.html',
        controller: 'businessDetailCtrl'
      }).
      otherwise({
        redirectTo: '/business'
      });
  }]);