'use strict';

angular.module('Books')

.controller('BooksController',
    ['$scope', '$rootScope', 'BooksService',
    function ($scope, $rootScope, BooksService) {

        $scope.username = $rootScope.globals.currentUser.username;
        $scope.role = $rootScope.globals.currentUser.role;
        
        var loadBooks = function() {
            BooksService.getAllBooks(function(response, result) {
                $scope.books = response.data;
            });
        };
        
        loadBooks();
        $scope.gridOptions = { 
            data: 'books',
            excludeProperties: 'reviews'
        };
        
        $scope.checkoutBook = function(book) {
            book.username = $rootScope.globals.currentUser.username;
            delete book.$$hashKey;
            delete book.reviews;
            BooksService.updateBook(book, function(response, result) {
               
            }); 
        };
        
        $scope.returnBook = function(book) {
            book.username = null;
            delete book.$$hashKey;
            delete book.reviews;
            BooksService.updateBook(book, function(response, result) {
               
            });
        };
        
        $scope.deleteBook = function(book) {
            BooksService.deleteBook(book, function(response, result) {
            
            });
        };
    }]);
