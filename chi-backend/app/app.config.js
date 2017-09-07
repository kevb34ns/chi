let app = angular.module("app", ['siyfion.sfTypeahead']);

let fs = require('fs');
let mongoose = require('mongoose');

let configFilename = __dirname + "/../config/config.json";

app.controller('mainController', ['$scope', '$q', function($scope, $q) {
  $scope.config = JSON.parse(fs.readFileSync(configFilename, 'utf-8'));
  $scope.partsOfSpeech = $scope.config.partsOfSpeech;
  $scope.partSelection = ["0", "1"];

  mongoose.connect("mongodb://localhost/test", {
    useMongoClient: true
  });
  var entrySchema = {
    traditional: String,
    simplified: String,
    pinyin: String,
    definitions: [String]
  };
  var entries = mongoose.model('entries', entrySchema, 'dictionary');

  function queryEntriesNoPOS() {
    return new $q(function (resolve, reject) {
      entries.find({$or: [
        { partsOfSpeech: { $exists: false }}, 
        { partsOfSpeech: null }]},
        function(err, doc) {
          if (!err) {
            resolve(doc);
          } 
        });
    })
  }

  $scope.loadEntriesNoPOS = function() {
    var promise = queryEntriesNoPOS();
    promise.then(function(res) {
      $scope.entriesNoPOS = res;
    })
  }

  $scope.noPOSIndex = 0;

  $scope.addEntryPOS = function() {
    console.log($scope.partSelection);
  }

  $scope.nextEntryPOS = function() {
    if ($scope.noPOSIndex < $scope.entriesNoPOS.length - 1) {
      $scope.noPOSIndex++;
    }
  }


  var parts = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: $scope.partsOfSpeech
  })

  parts.initialize();

  $scope.partsDataset = {
    source: parts.ttAdapter()
  }
}])
