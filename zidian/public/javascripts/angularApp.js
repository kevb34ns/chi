var app = angular.module("zidian", ['ui.router']);

app.factory('DataService', function(){
	var simplifiedCheck = true;
	if (typeof(Storage) !== 'undefined') {
		var val = localStorage.getItem("isSimplified");
		if (val === 'false') {
			simplifiedCheck = false;
		}
	}

	return {
		isSimplified: simplifiedCheck
	};
});

app.factory('SearchService', ['$http', function($http) {
	return {
		/**
		 * Returns an array of results for the specified query.
		 * @param searchTerm The term to query the database for.
		 * @return an array of objects, each of which represents a term.
		 */
		search: function(searchTerm) {
			return $http.get("http://localhost:3000/api/search/" + searchTerm).then(
				function(response) {
					return response.data;
				}
			)
		}
	}
}]);

app.controller('MainController', ['$scope', '$window', 'DataService', 
	function($scope, $window, DataService) {

		$scope.isSimplified = DataService.isSimplified;

		$scope.search = function(searchTerm) {
			if (!$scope.searchTerm || $scope.searchTerm === '') {
				return;
			}
			console.log($scope.searchTerm);
			$window.location.href = '#/search/' + $scope.searchTerm;
			$scope.searchTerm = '';
		}
	}
]);

app.controller('SearchController', ['$scope', '$rootScope', '$http', '$stateParams', 'DataService', 'SearchService', function($scope, $rootScope, $http, $stateParams, DataService, SearchService) {

	$scope.isSimplified = DataService.isSimplified;

	SearchService.search($stateParams.term).then(function(result) {
		console.log(result);
		$scope.entries = result;
		angular.forEach($scope.entries, function(entry) {
			entry.pinyin = pinyinify(entry.pinyin);	//TODO may violate view/controller separation; package pinyinify using node, perhaps
		});
	})
}]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider
			.state('home', {
				url:'/home',
				templateUrl:'/templates/home.html',
				controller: 'MainController'
			})
			.state('search', {
				url: '/search/{term}',
				templateUrl: 'templates/search.html',
				controller: 'SearchController'
			});

		$urlRouterProvider.otherwise('/home');
		// $locationProvider.hashPrefix('!').html5Mode(true); //TODO resolve # issue
}]);