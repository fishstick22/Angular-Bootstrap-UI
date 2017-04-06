/*
 * SpringBoot Demo Angular main app and controller
 */
"use strict";

var app = angular.module('demoApp', [ 'ngResource','ngRoute' ]);

/* http://stackoverflow.com/questions/31121672/how-to-populate-values-in-li-using-ng-repeat-from-json */

var navPages = [
	{
		"name": "Home"
	},
	{
		"name": "Person"
	}		
];

var thumbImages = [
	{
		"name" : "Cinque Terre",
		"image": "cinqueterre.jpg"
	},
	{
		"name" : "New York",
		"image": "newyork.jpg"
	}		
];


app.controller('DemoController', [ '$scope','$http', function($scope,$http) {
	var demo = this;
	var logCt=0;
	
	demo.navSelectedPage='Home';
	demo.navSelectedImage='cinqueterre.jpg';

	//$scope.navPages=navPages;
	//var jsonNavFile =  "./config/navPages.json";
	//http://stackoverflow.com/questions/41169385/http-get-success-is-not-a-function
	//The .success syntax was correct up to Angular v1.4.3.
	//$http.get(jsonNavFile).success(function(response){
	//    $scope.navPages=response;
	//});

	$http({
		method : 'GET',
		url    : 'config/navPages.json'
	}).then(function(successResponse) {
		console.log('Success getting navPages.json ' + successResponse);
		$scope.navPages=successResponse.data;
	}, function(errorResponse) {
		console.log('ERROR getting navPages.json ' + errorResponse);
	});

//shortcut with callbacks
//	$http.get('config/navPages.json').then(successCallback, errorCallback);
//
//	function successCallback(response){
//	    //success code
//		console.log('Success getting navPages.json ' +response.data);
//		$scope.navPages=response.data;
//	}
//	function errorCallback(error){
//	    //error code
//		console.log('ERROR getting navPages.json ' +error);
//	}

	demo.navToPage = function(page, subname, subview) {
		console.log('Inside navToPage, going to ' +page +' ' +subname +' ' +subview);
		demo.navSelectedPage=page;
		demo.navSelectedSubName=subname;
		demo.navSelectedSubView=subview;
	}

	//$scope.thumbImages=thumbImages;
	$http.get('config/thumbImages.json').then(thumbImagesSuccessCallback, thumbImagesErrorCallback);
	
	function thumbImagesSuccessCallback(response){
		//success code
		console.log('Success getting thumbImages.json ' +response.data);
		$scope.thumbImages=response.data;
	}
	function thumbImagesErrorCallback(error){
		//error code
		console.log('ERROR getting thumbImages.json ' +error);
	}	
	// ng-click="demoCtrl.navToImage('Bootstrap', '#thumbnail', thumbImage.image)"
	demo.navToImage = function(page, subname, subview, image) {
		console.log('Inside navToImage, going to ' +image +' on ' +page);
		demo.navSelectedImage=image;
		demo.navToPage(page, subname, subview);
	}
	
	//only way I can think of to log from ng-repeat in html...
	demo.logThis = function(logString) {
		console.log(logCt++ +' logThis: ' +logString);
	}
	
} ]);

/* http://stackoverflow.com/questions/23613114/angular-scroll-to-top-on-click-with-jquery-animate */

app.directive('scrollup', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.bind("click", function () {

                // Maybe abstract this out in an animation service:
                // Ofcourse you can replace all this with the jQ 
                // syntax you have above if you are using jQ
                function scrollToTop(element, to, duration) {
                    if (duration < 0) return;
                    var difference = to - element.scrollTop;
                    var perTick = difference / duration * 10;

                    setTimeout(function () {
                        element.scrollTop = element.scrollTop + perTick;
                        scrollToTop(element, to, duration - 10);
                    }, 10);
                }

                // then just add dependency and call it
                scrollToTop($document[0].body, 0, 400);
            });
        }
    };
});

/* http://stackoverflow.com/questions/21715256/angularjs-event-to-call-after-content-is-loaded */

app.directive( 'elemReady', function( $parse ) {
	return {
		restrict : 'A',
		link : function($scope, elem, attrs) {
			elem.ready(function() {
				$scope.$apply(function() {
					var func = $parse(attrs.elemReady);
					func($scope);
				})
			})
		}
	}
});

