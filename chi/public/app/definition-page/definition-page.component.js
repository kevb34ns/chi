let definitionController = [
  '$routeParams', '$location', '$scope', 'CacheService', 'APIService',
  function($routeParams, $location, $scope, CacheService, APIService) {

    let ctrl = this;
    let $j = angular.element;

    ctrl.isSimplified = CacheService.isSimplified();
    $scope.$watch(() => { return CacheService.isSimplified() },
        (newVal) => { ctrl.isSimplified = newVal; });

    //TODO handle case where there is no result for this term (err/empty array),
    // or when certain fields (strokes, radical, stroke anim) are empty, maybe
    // send 404s from server to indicate empty fields?
    APIService.getTerm($routeParams.term)
      .then(function(result) {
        ctrl.entries = result;
        angular.forEach(ctrl.entries, function(entry) {
          entry.pinyin = pinyinify(entry.pinyin);
        });
        ctrl.isSingleCharacter = ctrl.entries[0].traditional.length === 1;
        if (ctrl.isSingleCharacter) {
          ctrl.getRadicals();
          // TODO reload SVG if the user switches between simplified/traditional
          let charCode = ctrl.isSimplified ? 
              ctrl.entries[0].simplified.charCodeAt(0) :
              ctrl.entries[0].traditional.charCodeAt(0)
          APIService.getSVG(charCode)
            .then((result) => {
              let xmlDoc = $j.parseXML(result);
              ctrl.svg = $j(xmlDoc).find('svg');
              $j('#svg-container').html(ctrl.svg);
              $j('#svg-container').css('display', 'block');
            })
        }

        if (ctrl.isSimplified) {
          ctrl.getSentences(ctrl.entries[0].simplified);
        } else {
          ctrl.getSentences(ctrl.entries[0].traditional);
        }
        
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

      ctrl.goToDefinition = function(index) {
        if (ctrl.entries[0] && Number.isInteger(index) &&
            index >= 0 && index < ctrl.entries[0].traditional.length) {

          $location.path('/definition/' + 
              ctrl.entries[0].traditional.charAt(index));
        }
      }

      ctrl.goToRadical = function(term) {
        if (term && term.length > 0) {
          $location.path('/definition/' + term);
        }
      }

      ctrl.reloadSVG = function() {
        angular.element('#svg-container').html(ctrl.svg);
      }

      ctrl.goToWord = function(word) {
        $location.path('/definition/' + word);
      }

      ctrl.getMeasureWords = function(index) {
        let measureWords = ctrl.isSimplified ? 
            ctrl.entries[index].sMeasureWords : 
            ctrl.entries[index].tMeasureWords;
        
        return measureWords;
      }

      ctrl.getSentences = function(term) {
        APIService.getSentences(term)
          .then((result) => {
            ctrl.sentences = result;
          }
        );
      }
  }
];

angular.module('definitionPage')
.component('definitionPage', {
  templateUrl: '/app/definition-page/definition-page.template.html',
  controller: definitionController
});