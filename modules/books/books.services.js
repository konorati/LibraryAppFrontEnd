'use strict';

angular.module('Books')

.factory('BooksService',
    ['$http',
    function ($http) {

        var service = {};
        
        service.getAllBooks = function(callback) {
            function handleSuccess(res) {
                // Pass the result of $http.get to the callback.
                return callback(res, true);
            }

            function handleError(res) {
                return callback(res, false);
            }
            
            $http.get('http://localhost:4567/api/books')
                    .then(handleSuccess, handleError);
        };
        
        service.updateBook = function(book, callback) {
            function handleSuccess(res) {
                return callback(res, true);
            }
            function handleError(res) {
                return callBack(res, false);
            }
            
            $http.put('http://localhost:4567/api/books/' + book.id, JSON.stringify(book), {headers: {'Content-Type': 'application/json'} })
                    .then(handleSuccess, handleError);
        };
        
        service.deleteBook = function(book, callback) {
            function handleSuccess(res) {
                return callback(res, true);
            }
            function handleError(res) {
                return callBack(res, false);
            }
            
            $http.delete('http://localhost:4567/api/books/' + book.id)
                    .then(handleSuccess, handleError);
        }
        
        return service;
}]);