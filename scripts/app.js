'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Books', []);

angular.module('app', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies',
    'Books'
])
.controller("AppController", function($scope) {
    $scope.navigation = true; // default visibility state

    $scope.showNavigation = function(show) {
        $scope.navigation = show;
    };
}) 
        

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html'
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        
        .when('/books', {
            controller: 'BooksController',
            templateUrl: 'modules/books/views/books.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
