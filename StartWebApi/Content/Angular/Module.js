//declare a module
var app = angular.module("myApp", ['ngRoute']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'Views/Home/Index.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'Developer',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'Views/Home/contact.html',
            controller: 'contactController'
        });
});

app.controller('aboutController', function ($scope) {
    $scope.massage = "TEST";
});