/**
 * Created by Administrador on 21/01/2015.
 */


service.factory('Business', ['$resource',
  function($resource){

      var service = {};
      service.getAll = $resource('http://54.94.193.127:8888/businesses/:zone', {}, {
          query: {method:'GET', params:{zone:'54bfd6ab25c15c5657b36b59'}}
      });

      service.getOne = $resource('http://54.94.193.127:8888/business/:businessId', {}, {
         query: {method:'GET', params:{business:'businessId'}}
      });

      return service;
  }]);