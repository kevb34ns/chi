var app = angular.module("flapperNews", ['ui.router']);

app.controller('MainController', ['$scope', '$http','posts', function($scope, $http, posts) {
	$scope.posts = posts.posts;
	$scope.addPost = function() {
		if(!$scope.title || $scope.title === '') {
			return;
		}
		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link,
			upvotes: 0,
			comments: [
				{
					author: 'Joe',
					body: 'Cool post!',
					upvotes: 0
				},
				{
					author: 'Bob',
					body: 'Great idea but everything is wrong!',
					upvotes: 0
				}
			]
		});
		$scope.title = '';
		$scope.link = '';
	};
	$scope.upvotePost = function(post) {
		post.upvotes++;	
	};
	$http.get("http://localhost:3000/foodData").success(function(result) {
		$scope.food = result;
	})
}]);

app.controller('PostsController', ['$scope', '$stateParams', 
	'posts', function($scope, $stateParams, posts) {
		$scope.post = posts.posts[$stateParams.id];
		$scope.addComment = function() {
			if ($scope.body === '') {
				return;
			}
			$scope.post.comments.push({
				body: $scope.body,
				author: $scope.author,
				upvotes: 0
			})
			$scope.body = '';
			$scope.author = '';
		};
		$scope.upvoteComment = function(comment) {
			comment.upvotes++;	
		};
	}])

app.factory('posts', [function() {
	var serviceInstance = {
		posts: [
			{
			title: 'post 1', 
			link: '',
			comments: [],
			upvotes: 5
			},
			{
				title: 'post 2', 
				link: '',
				comments: [],
				upvotes: 2
			},
			{
				title: 'post 3', 
				link: '',
				comments: [],
				upvotes: 12
			},
			{
				title: 'post 4', 
				link: '',
				comments: [],
				upvotes: 9
			},
			{
				title: 'post 5', 
				link: '',
				comments: [],
				upvotes: 4
			}	
		]
	};
	return serviceInstance;
}])

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainController'
			})
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsController'
			});

		$urlRouterProvider.otherwise('home');
	}
])