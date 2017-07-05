var modeToggleController = [
  'CacheService',
  function(CacheService) {
    var ctrl = this;
    ctrl.isSimplified = CacheService.isSimplified();
  }
];

angular.module('app')
.component('modeToggle', {
  templateUrl: '/app/core/mode-toggle/mode-toggle.template.html',
  controller: modeToggleController
});