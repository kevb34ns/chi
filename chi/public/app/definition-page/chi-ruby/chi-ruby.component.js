/**
 * Emulates HTML5's <ruby> element, but customized for definitions and designed
 * to work across different browsers.
 */

let chiRubyController = [
  function() {
    let ctrl = this;
  }
];

angular.module('definitionPage')
.component('chiRuby', {
  templateUrl: '/app/definition-page/chi-ruby/chi-ruby.template.html',
  controller: chiRubyController,
  bindings: {
    simplified: '@',
    traditional: '@',
    pinyin: '@',
    isSimplified: '<',
    onTermClicked: '&'
  }
});