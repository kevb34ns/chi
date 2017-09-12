angular.module('app')
.factory('externalAPIService', [
  'MongoService',
  '$http',
  function(MongoService, $http) {
    let database = MongoService.entryDb();
    let characterUrl = 'http://ccdb.hemiola.com/characters?fields=string,kRSKangXi,kTotalStrokes';
    let radicalUrl = 'http://ccdb.hemiola.com/characters/radicals/${radNum}?fields=string,kRSKangXi&filter=${mode}';

    var numEntriesUpdated = 0;

    /**
     * Use the input parameter to update the database entry
     * @param {string: String, kRSKangXi: String?, kTotalStrokes: String} obj 
     */
    function setRadicalAndStroke(obj) {
      var tDoc = {
        $set: {
          tStrokes:  obj.kTotalStrokes
        }
      };

      var sDoc = {
        $set: {
          sStrokes: obj.kTotalStrokes
        }
      }

      if (obj.kRSKangXi) {
        tDoc.$set.tRadical = obj.kRSKangXi;
        sDoc.$set.sRadical = obj.kRSKangXi;
      }

      database.updateMany({ traditional: obj.string }, tDoc, function(err, raw) {
        if (err) {
          console.log(err);
        }
      });

      database.updateMany({ simplified: obj.string }, sDoc, function(err, raw) {
        if (err) {
          console.log(err);
        }
      });

      numEntriesUpdated++;
    }

    function createOrUpdateRadicalDatabase() {
      var radNum = 1;
      // !simplified+!simplifiable: characters with only one variant
      // simplified: the simplified variant of a character
      var mode = '!simplified+!simplifiable';
    }

    return {
      updateRadicalsAndStrokes: () => {
        numEntriesUpdated = 0;

        $http.get(characterUrl)
          .then(function(response) {
            response.data.forEach((obj) => {
              setRadicalAndStroke(obj);
            });
          })
      },
      updateRadicalDatabase: () => {
        createOrUpdateRadicalDatabase();
      },
      getNumEntriesUpdated: () => { return numEntriesUpdated; }
    }
  }
]);