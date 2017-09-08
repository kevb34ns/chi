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
      .when('/search/:query', {
        template: '<results-page></results-page>'
      })
      .when('/definition/:term', {
        template: '<definition-page></definition-page>'
      })
      .otherwise('/');
  }
]);