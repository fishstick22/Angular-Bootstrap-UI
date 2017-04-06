/**
 * angular-tutorial.js
 * angular code for online tutorials
 * https://www.w3schools.com/angular/angular_intro.asp
 */

"use strict";
/* demoApp defined in demoApp.js
 * 
 * var app = angular.module('demoApp', [ 'ngResource','ngRoute' ]);
 */

// basic controller not using 'as' syntax
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
});



app.directive("w3TestDirective", function() {
    return {
        template : "I was made in a directive constructor!"
    };
});