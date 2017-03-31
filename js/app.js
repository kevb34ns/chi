var app = angular.module("flapperNews", []);

app.controller('MainController', ['$scope', function($scope) {
	$scope.text = 'Hello World!';
	$scope.posts = [
		{
			title: 'post 1', 
			link: '',
			upvotes: 5
		},
		{
			title: 'post 2', 
			link: '',
			upvotes: 2
		},
		{
			title: 'post 3', 
			link: '',
			upvotes: 12
		},
		{
			title: 'post 4', 
			link: '',
			upvotes: 9
		},
		{
			title: 'post 5', 
			link: '',
			upvotes: 4
		}	
	];
	$scope.addPost = function() {
		if(!$scope.title || $scope.title === '') {
			return;
		}
		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link
			upvotes: 0
		});
		$scope.title = '';
		$scope.link = '';
	};
	$scope.upvotePost = function(post) {
		post.upvotes++;	
	};
}]);