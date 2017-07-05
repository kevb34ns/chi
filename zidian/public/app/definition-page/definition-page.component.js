var definitionController = [
  '$routeParams', 'CacheService', 'APIService',
  function($routeParams, CacheService, APIService) {

    var ctrl = this;
    ctrl.isSimplified = CacheService.isSimplified();

    APIService.getTerm($routeParams.term)
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