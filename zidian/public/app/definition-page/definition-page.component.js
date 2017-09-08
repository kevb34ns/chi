var definitionController = [
  '$routeParams', '$scope', 'CacheService', 'APIService',
  function($routeParams, $scope, CacheService, APIService) {

    var ctrl = this;

    ctrl.isSimplified = CacheService.isSimplified();
    $scope.$watch(() => { return CacheService.isSimplified() },
        (newVal) => { ctrl.isSimplified = newVal; });

    //TODO handle case where there is no result for this term (err/empty array)
    APIService.getTerm($routeParams.term)
      .then(function(result) {
        ctrl.entries = result;
        ctrl.isSingleCharacter = ctrl.entries[0].length === 1;
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