let app = angular.module("app", ['siyfion.sfTypeahead']);

app.controller('mainController', ['$scope', '$q', function($scope, $q) {
  // nav bar
  $scope.navSelection = "main";

}])
