controllers.controller('ModalCtrl',[
    '$scope',
    'close',
    'BusinessSvc',
    'ZoneSvc',
    'CategorySvc',
    'PromStatesSvc',
    'PromTypesSvc',
    'object',
    '$upload',
    '$timeout',
    '$compile',
    'ENV',
    function($scope, close, BusinessSvc, ZoneSvc, CategorySvc, PromStatesSvc, PromTypesSvc, object, $upload, $timeout, compile, ENV){

        $scope.business = {};
        $scope.zone = {};
        $scope.category = {};
        $scope.promotion = {};
        $scope.promotion.types = {};
        $scope.promStates = {};

        if(object)$scope.form = {};

        $scope.form = angular.copy(object);

        console.log($scope.form)

        BusinessSvc.get(function(response){
            $scope.business.results = response
        });

        ZoneSvc.get(function(response){
            $scope.zone.results = response
        });

        CategorySvc.get(function(response){
            $scope.category.results = response
        });

        PromTypesSvc.get(function(response){
            $scope.promotion.types.results = response.data;
        });

        PromStatesSvc.get(function(response){
            $scope.promStates.results = response.data;
        })


    	$scope.$watch('files', function(files) {
    		$scope.formUpload = false;
    		if (files != null) {
    			for (var i = 0; i < files.length; i++) {
    				$scope.errorMsg = null;
    				(function(file) {
    					generateThumbAndUpload(file);
    				})(files[i]);
    			}
    		}
    	});

    	$scope.uploadPic = function(files) {
    		$scope.formUpload = true;
    		if (files != null) {
    			generateThumbAndUpload(files[0])
    		}
    	};

    	function generateThumbAndUpload(file) {
    		$scope.errorMsg = null;
    		$scope.generateThumb(file);
    		uploadUsing$upload(file);
    	}

    	$scope.generateThumb = function(file) {
    		if (file != null) {
    			if (file.type.indexOf('image') > -1) {
    				$timeout(function() {
    					var fileReader = new FileReader();
    					fileReader.readAsDataURL(file);
    					fileReader.onload = function(e) {
    						$timeout(function() {
    							file.dataUrl = e.target.result;
    						});
    					}
    				});
    			}
    		}
    	};

        $scope.close = function(result){
            close(result, 300);
        }
    }
]);
