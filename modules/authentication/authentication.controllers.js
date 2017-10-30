'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function() {
            $scope.dataLoading = true;
            
            /*
             * Attempt a login providing a callback for the result.
             * response - Response from the server.
             * result - true if login succeeded, false otherwise.
             */
            AuthenticationService.Login($scope.username, $scope.password, function (response, result) {
                if (result === true) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data.userType);
                        $location.path('/');
                } else {
                    $scope.error = response.data.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);