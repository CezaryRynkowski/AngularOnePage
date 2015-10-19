(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('myApp', ['ngRoute']).config(config);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'Views/Home/Index.html',
                controller: 'mainController'
            })

            // route for the about page
            .when('/developer', {
                templateUrl: 'Developer',
                controller: 'developerController'
            });

        $locationProvider.html5Mode(true);
    }
})();