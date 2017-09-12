let radStrController = [
  'externalAPIService',
  '$scope',
  function(externalAPIService, $scope) {
    let ctrl = this;

    ctrl.numEntriesUpdated = 0;

    ctrl.updateRadicalsAndStrokes = function() {
      externalAPIService.updateRadicalsAndStrokes();
    }

    $scope.$watch(() => externalAPIService.getNumEntriesUpdated(),
        (newVal) => ctrl.numEntriesUpdated = newVal);

    ctrl.updateRadicalDb = function() {
      externalAPIService.updateRadicalDatabase();
    }
  }
];

angular.module('app')
.component('radStrPage', {
  templateUrl: './rad-str-page/rad-str-page.template.html',
  controller: radStrController
});