(function() {
	myapp = angular.module('myBook',['ngRoute']);
	
	myapp.config(function($routeProvider) {
	  $routeProvider
		.when('/', {
		  templateUrl:'/home.html',
		})	  
		.when('/feed', {
		  templateUrl:'/feed.html',
		  controller: 'feedCtrl'
		})
		.when('/profile', {
		  templateUrl:'/profile.html',
		  controller: 'feedCtrl'
		})		
		.otherwise({
		  redirectTo:'/'
		});
	});
}());