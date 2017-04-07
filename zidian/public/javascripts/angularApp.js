var app = angular.module("zidian", ['ui.router']);

app.controller('MainController', ['$scope', '$window', function($scope, $window) {

	$scope.search = function(searchTerm) {
		if (!$scope.searchTerm || $scope.searchTerm === '') {
			return;
		}

		$window.location.href = '#/search/' + $scope.searchTerm;
		$scope.searchTerm = '';
	}

}]);

app.controller('SearchController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
	$http.get("http://localhost:3000/api/search/" + $stateParams.term)
		.success(function(result) {
			$scope.entries = result;
		});
}]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
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

		$urlRouterProvider.otherwise('home');
}]);