describe('businessCtrl', function(){

  it('should create "Business" model with 3 business', function() {
    var scope = {},
        ctrl = new businessCtrl(scope);

    expect(scope.businesses.length).toBe(3);
  });

});