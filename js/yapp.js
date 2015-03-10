var yapp = angular.module('Yapp',[
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'summernote',
    'ngSanitize',
    'config',
    'angularFileUpload',
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
                controller: 'PromsCtrl'
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
    '$cookieStore',
    '$http',
    function ($rootScope, $location, $cookieStore, $http) {

        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

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
            if (!whiteUrl() && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
            if (!whiteUrl() && $rootScope.globals.currentUser) {
                $rootScope.$broadcast('menu', { 'show' : true });
            }
        });
    }]);
