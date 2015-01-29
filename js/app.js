/**
 * Created by Administrador on 21/01/2015.
 */
var ya = angular.module('ya', [
    'ngRoute',
    'ngResource',
    'ya.controllers',
    'ya.service'
]);

var controllers = angular.module('ya.controllers',[]);
var service = angular.module('ya.service',[]);

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