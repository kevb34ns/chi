angular.module('app')
.config([
  '$locationProvider',
  '$routeProvider',
  function($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        template: '<main-page></main-page>'
      })
      .when('/search/:term', {
        template: '<results-page></results-page>'
      })
      .otherwise('/');
  }
]);