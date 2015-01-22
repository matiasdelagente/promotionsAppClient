/**
 * Created by Administrador on 21/01/2015.
 */

var businessServices = angular.module('businessServices', ['ngResource']);

businessServices.factory('Business', ['$resource',
  function($resource){
    return $resource('business/:businessId.json', {}, {
      query: {method:'GET', params:{businessId:'business'}, isArray:true}
    });
  }]);