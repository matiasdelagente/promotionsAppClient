
describe('businessDetailCtrl', function () {

    beforeEach(module('ya'));

    var businessDetailCtrl, scope, $httpBackend, service;

    beforeEach(inject(function ( $controller, $rootScope, $routeParams) {

        scope = $rootScope.$new();
        $routeParams='54bfd77925c15c5657b36b5b';
        businessDetailCtrl = $controller('businessDetailCtrl', {
            $scope: scope
        });
    }));

    it('should get "Business detail" model with 1 business', function () {
        expect(scope.business.result.length).toBe(1);
    });

});
