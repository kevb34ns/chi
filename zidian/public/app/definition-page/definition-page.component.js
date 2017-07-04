var definitionController = [
  '$routeParams', 'CacheService', 'SearchService',
  function($routeParams, CacheService, SearchService) {

    var ctrl = this;
    ctrl.isSimplified = CacheService.isSimplified;

    SearchService.getTerm($routeParams.term)
      .then(function(result) {
        ctrl.entries = result;
        angular.forEach(ctrl.entries, function(entry) {
          entry.pinyin = pinyinify(entry.pinyin);
        });
      });
  }
];

angular.module('definitionPage')
.component('definitionPage', {
  templateUrl: '/app/definition-page/definition-page.template.html',
  controller: definitionController
});