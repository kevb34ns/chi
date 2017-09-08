var modeToggleController = [
  'CacheService',
  function(CacheService) {
    var ctrl = this;
    ctrl.isSimplified = CacheService.isSimplified();
    ctrl.setSimplified = (isSimplified) => {
      ctrl.isSimplified = isSimplified;
      CacheService.setSimplified(isSimplified);
    }
  }
];

angular.module('app')
.component('modeToggle', {
  templateUrl: '/app/core/mode-toggle/mode-toggle.template.html',
  controller: modeToggleController
});