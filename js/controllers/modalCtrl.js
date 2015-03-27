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
    function($scope, close, BusinessSvc, ZoneSvc, CategorySvc, PromStatesSvc, PromTypesSvc, object, $upload, $timeout, compile){

        $scope.business = {};
        $scope.zone = {};
        $scope.category = {};
        $scope.promotion = {};
        $scope.promotion.types = {};
        $scope.promotion.states = {};

        $scope.form = angular.copy(object);

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
            $scope.promotion.types.results = response;
        });

        PromStatesSvc.get(function(response){
            $scope.promotion.states.results = response;
        })

    	$scope.changeAngularVersion = function() {
    		window.location.hash = $scope.angularVersion;
    		window.location.reload(true);
    	};

    	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
    			window.location.hash.substring(2): window.location.hash.substring(1)) : '1.2.20';

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
    		if ($scope.howToSend === 1) {
    			uploadUsing$upload(file);
    		} else if ($scope.howToSend == 2) {
    			uploadUsing$http(file);
    		} else {
    			uploadS3(file);
    		}
    	}

    	$scope.generateThumb = function(file) {
    		if (file != null) {
    			if (file.type.indexOf('image') > -1) {
    				$timeout(function() {
                        console.log("holis")
    					var fileReader = new FileReader();
    					fileReader.readAsDataURL(file);
    					fileReader.onload = function(e) {
    						$timeout(function() {
    							file.dataUrl = e.target.result;
                                console.log(file.dataUrl)
    						});
    					}
    				});
    			}
    		}
    	};

    	function uploadUsing$upload(file) {
    		file.upload = $upload.upload({
    			url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
    			method: 'POST',
    			headers: {
    				'my-header' : 'my-header-value'
    			},
    			fields: {username: $scope.username},
    			file: file,
    			fileFormDataName: 'myFile'
    		});

    		file.upload.then(function(response) {
    			$timeout(function() {
    				file.result = response.data;
    			});
    		}, function(response) {
    			if (response.status > 0)
    				$scope.errorMsg = response.status + ': ' + response.data;
    		});

    		file.upload.progress(function(evt) {
    			// Math.min is to fix IE which reports 200% sometimes
    			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    		});

    		file.upload.xhr(function(xhr) {
    			// xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
    		});
    	}

        $scope.close = function(result){
            close(result, 300);
        }
    }
]);
