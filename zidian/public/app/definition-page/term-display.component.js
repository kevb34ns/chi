angular.module('definitionPage')
.component('termDisplay', {
  templateUrl: '/app/definition-page/term-display.template.html',
  bindings: {
    entry: '<',
    isSimplified: '<'
  }
});