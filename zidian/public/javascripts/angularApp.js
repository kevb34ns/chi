var app = angular.module("zidian", ['ui.router']);

app.controller('MainController', ['$scope', '$window', function($scope, $window) {

	$scope.search = function(searchTerm) {
		if (!$scope.searchTerm || $scope.searchTerm === '') {
			return;
		}
		console.log($scope.searchTerm);
		$window.location.href = '/search/' + $scope.searchTerm;
		$scope.searchTerm = '';
	}

}]);

app.controller('SearchController', ['$scope', '$rootScope', '$http', '$stateParams', function($scope, $rootScope, $http, $stateParams) {
	$http.get("http://localhost:3000/api/search/" + $stateParams.term)
		.success(function(result) {
			$scope.entries = result;
			angular.forEach($scope.entries, function(entry) {
				entry.pinyin = pinyinify(entry.pinyin);	
			});
		});

	$rootScope.$on('$stateChangeStart', function(event, to, toParams, from, fromParams) {
        console.log("hello");
    });
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