'use strict';

describe('businessCtrl', function () {

    beforeEach(module('ya'));

    var businessCtrl, scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        businessCtrl = $controller('businessCtrl', {
            $scope: scope
        });
    }));

    it('should get "Business" model with 5 business', function () {
        expect(scope.businesses.length).toBe(5);
    });

});