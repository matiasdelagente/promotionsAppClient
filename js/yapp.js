var yapp = angular.module('Yapp',[
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'summernote',
    'ngSanitize',
    'config',
    'angularFileUpload',
    'ngFileUpload',
    'angularModalService',
    'Yapp.controllers',
    'Yapp.services',
    'Yapp.filters'
]);

var controllers = angular.module('Yapp.controllers',[]);
var services = angular.module('Yapp.services',[]);
var filters = angular.module('Yapp.filters',[]);

yapp.config([
    '$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .when('/admin', {
                templateUrl: 'templates/admin.html',
                controller: 'AdminCtrl'
            })
            .when('/dash', {
                templateUrl: 'templates/dash.html',
                controller: 'DashCtrl'
            })
            .when('/configuraciones', {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsCtrl'
            })
            .when('/proms',{
                templateUrl: 'templates/proms.html',
                controller: 'PromotionCtrl'
            })
            .when('/business',{
                templateUrl: 'templates/business.html',
                controller: 'BusinessCtrl'
            })
            .when('/users',{
                templateUrl: 'templates/users.html',
                controller: 'UsersCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

yapp.run([
    '$rootScope',
    '$location',
    'AuthSvc',
    function ($rootScope, $location, AuthSvc) {

        $rootScope.globals = $rootScope.globals || {};

        AuthSvc.autoLogin(function(response){
            if(!response.success)return;
            $location.path('/dash');
        });

        /**
         * Add here a list of URL that not need login
         * @method whiteUrl
         * @returns {boolean}
         */
        function whiteUrl(){
            var paths = [
                '/login',
                '/'
            ];
            var access = true;
            for(var p in paths){
                if ($location.path() === paths[p]) {
                    access = true;
                    break;
                }
                access = false;
            }
            if(access){
                $rootScope.$broadcast('menu', { 'show' : false });
            }
            return access;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if($location.path() === ''){
                $location.path('/');
                return;
            }
            if (!whiteUrl() && !$rootScope.globals.token) {
                $location.path('/login');
            }
            if (!whiteUrl() && $rootScope.globals.token) {
                $rootScope.$broadcast('menu', { 'show' : true });
            }
        });
    }]);
