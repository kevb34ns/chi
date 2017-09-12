let app = angular.module("app", ['siyfion.sfTypeahead']);

app.controller('mainController', ['$scope', function($scope) {
  // nav bar
  $scope.navSelection = "main";
}])
