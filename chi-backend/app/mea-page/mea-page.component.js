let measureWordsController = [
  'MongoService',
  function(MongoService) {

    let ctrl = this;
    let db = MongoService.entryDb();

    function extractAndSetMeasureWords(id, definitions) {

      var re = /(\S\|\S)\[|(\S)\[/g; 
      for (let def of definitions) {
        if (def.match(/^CL:/)) {
          var result;
          do {
            result = re.exec(def);
            if (result) {
              let match = (result[1] ? result[1] : result[2]).match(/^(.)\|(.)$|(^.$)/);
              var tMeasureWord;
              var sMeasureWord;
              if (match[3]) {
                tMeasureWord = match[3];
                sMeasureWord = match[3];
              } else {
                tMeasureWord = match[1];
                sMeasureWord = match[2];
              }
              
              db.updateOne(
                { _id: id }, 
                { $addToSet: 
                  { tMeasureWords: tMeasureWord, sMeasureWords: sMeasureWord }
                }, 
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );

            }
          } while (result)
        }
      }
    }

    ctrl.updateMeasureWords = function() {

      db.find(
        { "definitions": { $regex: /^CL:/ }}, 
        function(err, entryArray) {
          if (!err) {
            for (let entry of entryArray) {
              extractAndSetMeasureWords(entry._id, entry.definitions);
            }
          }
        }
      )
    }
  }
]

angular.module('app')
.component('meaPage', {
  templateUrl:'./mea-page/mea-page.template.html',
  controller: measureWordsController
})