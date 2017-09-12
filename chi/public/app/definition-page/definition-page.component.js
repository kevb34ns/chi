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
        angular.forEach(ctrl.entries, function(entry) {
          entry.pinyin = pinyinify(entry.pinyin);
        });
        ctrl.isSingleCharacter = ctrl.entries[0].traditional.length === 1;
        ctrl.getRadicals();
      });
    
      ctrl.getRadicals = function() {
        if (ctrl.entries[0].tRadical) {
          let i = ctrl.entries[0].tRadical.indexOf('.');
          if (i != -1) {
            APIService.getRadical(ctrl.entries[0].tRadical.substring(0, i))
              .then((result) => {
                ctrl.tRadical = result.traditional;
              })
          }
        }

        if (ctrl.entries[0].sRadical) {
          let i = ctrl.entries[0].sRadical.indexOf('.');
          if (i != -1) {
            APIService.getRadical(ctrl.entries[0].sRadical.substring(0, i))
              .then((result) => {
                ctrl.sRadical = (result.simplified) ? 
                  result.simplified : result.traditional;
              })
          }
        }
      }
      ctrl.speak = function() {
        let tts = window.speechSynthesis;
        if (tts) {
          let utter = new SpeechSynthesisUtterance(ctrl.entries[0].simplified);
          utter.lang = 'zh-CN';
          utter.rate = .5;
          tts.speak(utter);
        }
      }
  }
];

angular.module('definitionPage')
.component('definitionPage', {
  templateUrl: '/app/definition-page/definition-page.template.html',
  controller: definitionController
});