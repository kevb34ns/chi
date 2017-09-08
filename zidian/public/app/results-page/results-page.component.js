var searchController = [
  '$routeParams', '$location', '$scope', `CacheService`, 'APIService',
  function($routeParams, $location, $scope, CacheService, APIService) {
    
    var ctrl = this;

    ctrl.isSimplified = CacheService.isSimplified();
    $scope.$watch (
      () => { return CacheService.isSimplified(); }, 
      (newVal) => { ctrl.isSimplified = newVal; });

    ctrl.query = $routeParams.query;

    APIService.search($routeParams.query)
      .then(function(result) {
        ctrl.entries = result;
        angular.forEach(ctrl.entries, function(entry) {
          entry.pinyin = pinyinify(entry.pinyin);
        })
      });

    ctrl.goToDefinition = function(term) {
      if (!term || term === '') {
        return;
      }

      $location.path('/definition/' + term);
    }
  }
];

angular.module('resultsPage')
.component('resultsPage', {
  templateUrl: '/app/results-page/results-page.template.html',
  controller: searchController
});