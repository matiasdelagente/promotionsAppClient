'use strict';

describe('businessCtrl', function () {

    beforeEach(module('ya'));

    var businessCtrl, scope, $httpBackend, service;

    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, Business) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        service = Business;
        businessCtrl = $controller('businessCtrl', {
            $scope: scope,
            Business: service
        });
    }));

    it('should get "Business" model with 5 business', function () {
        console.log(service.getAll);
        expect(scope.businesses.result.length).toBe(5);
    });

});