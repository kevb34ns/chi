angular.module('app')
.factory('externalAPIService', [
  'MongoService',
  '$http',
  '$q',
  function(MongoService, $http, $q) {
    let database = MongoService.entryDb();
    let characterUrl = 'http://ccdb.hemiola.com/characters?fields=string,kRSKangXi,kTotalStrokes';

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

    function getRadicalUrl(mode) {
      let radicalUrl = `http://ccdb.hemiola.com/characters/radicals?strokes=0&fields=string&filter=${mode}`;
      return radicalUrl;
    }

    function getRadicals() {
      let mode1 = "!simplified";
      let mode2 = "simplified";

      return new $q(function(resolve, reject) {
        $http.get(getRadicalUrl(mode1))
            .then(function(response1) {
              $http.get(getRadicalUrl(mode2))
                  .then(function(response2) {
                    resolve({
                      mode1Radicals: response1.data,
                      mode2Radicals: response2.data
                    })
                  })
            })
      })
    }

    function createOrUpdateRadicalDatabase() {
      let numKangXiRadicals = 214;
      let radicalDb = MongoService.radicalDb();

      getRadicals().then((res) => {

        let radicalArray = [];
        for (var i = 0; i < numKangXiRadicals; i++) {
          radicalArray.push({ });
        }

        res.mode1Radicals.forEach((obj) => {
          let kangXi = parseInt(obj.radical);
          radicalArray[kangXi - 1].kangXi = kangXi;

          if (!radicalArray[kangXi - 1].traditional) {
            radicalArray[kangXi - 1].traditional = obj.string;
          } else {
            if (!radicalArray[kangXi - 1].variants) {
              radicalArray[kangXi - 1].variants = [];
            }

            radicalArray[kangXi - 1].variants.push(obj.string);
          }
        });

        res.mode2Radicals.forEach((obj) => {
          let kangXi = parseInt(obj.radical);
          radicalArray[kangXi - 1].kangXi = kangXi;

          if (!radicalArray[kangXi - 1].simplified) {
            radicalArray[kangXi - 1].simplified = obj.string;
          } else {
            if (!radicalArray[kangXi - 1].variants) {
              radicalArray[kangXi - 1].variants = [];
            }

            radicalArray[kangXi - 1].variants.push(obj.string);
          }
        });

        console.log(radicalArray);
        radicalArray.forEach((obj) => {
          radicalDb.update({ kangXi : obj.kangXi }, obj, { upsert: true }, (err, raw) => {
            if (err) {
              console.log(err);
            }
          })
        })
      })
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