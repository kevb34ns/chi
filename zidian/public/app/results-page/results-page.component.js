var searchController = [
  '$rootScope', '$routeParams', 
  `PreferencesService`, 'SearchService',
  function($rootScope, $routeParams, 
      PreferencesService, SearchService) {
    
    var ctrl = this;
    ctrl.isSimplified = PreferencesService.isSimplified;

    SearchService.search($routeParams.term)
      .then(function(result) {
        ctrl.entries = result;
        angular.forEach(ctrl.entries, function(entry) {
          entry.pinyin = pinyinify(entry.pinyin);
        })
      })
  }
]

angular.module('resultsPage')
.component('resultsPage', {
  templateUrl: '/app/results-page/results-page.template.html',
  controller: searchController
})