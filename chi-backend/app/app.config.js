let app = angular.module("app", ['siyfion.sfTypeahead']);

let fs = require('fs');
let mongoose = require('mongoose');

let configFilename = __dirname + "/../config/config.json";

app.controller('mainController', ['$scope', '$q', function($scope, $q) {
  // nav bar
  $scope.navSelection = "main";


  $scope.config = JSON.parse(fs.readFileSync(configFilename, 'utf-8'));

  mongoose.connect("mongodb://localhost/test", {
    useMongoClient: true
  });
  var entrySchema = {
    traditional: String,
    simplified: String,
    pinyin: String,
    definitions: [String],
    partOfSpeech: String
  };
  var entries = mongoose.model('entries', entrySchema, 'dictionary')

  // begin parts of speech section
  $scope.partsOfSpeech = $scope.config.partsOfSpeech;
  $scope.partSelection = "";;

  function queryEntriesNoPOS() {
    return new $q(function (resolve, reject) {
      entries.find({$or: [
        { partOfSpeech: { $exists: false }}, 
        { partOfSpeech: null }]},
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
      $scope.currentPOSEntry = $scope.entriesNoPOS[$scope.noPOSIndex];
    })
  }

  $scope.noPOSIndex = 0;

  function updatePOS() {
    return new $q(function (resolve, reject) {
      entries.findByIdAndUpdate(
        { _id: $scope.currentPOSEntry._id },
        { $set: { partOfSpeech: $scope.partSelection }},
        { new: true },
        function(err, doc) {
          if (err) {
            reject(err);
          } else {
            resolve(doc);
          }
        }
      )
    });
  }

  $scope.addEntryPOS = function() {
    console.log($scope.partSelection);
    updatePOS().then(function(res) {
      $scope.updatePOSResult = res;
    }, function(err) {
      $scope.updatePOSResult = err;
    });

    $scope.posForm.$setPristine();
    $scope.partSelection = "";

    $scope.nextEntryPOS();
  }

  $scope.nextEntryPOS = function() {
    if ($scope.noPOSIndex < $scope.entriesNoPOS.length - 1) {
      $scope.noPOSIndex++;
      $scope.currentPOSEntry = $scope.entriesNoPOS[$scope.noPOSIndex];
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
