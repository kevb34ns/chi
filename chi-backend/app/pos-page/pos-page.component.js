let posPageController = [
  'MongoService',
  '$q',
  function(MongoService, $q) {
    let ctrl = this
    let entries = MongoService.db()
    let fs = require('fs')
    let configFilename = __dirname + "/../config/config.json"

    ctrl.config = JSON.parse(fs.readFileSync(configFilename, 'utf-8'))
    ctrl.partsOfSpeech = ctrl.config.partsOfSpeech

    // initialize typeahead
    let parts = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: ctrl.partsOfSpeech
    })
    parts.initialize()

    ctrl.partsDataset = {
      source: parts.ttAdapter()
    }

    // load entries from database
    let promise = new $q(function (resolve, reject) {
      entries.find({$or: [
        { partOfSpeech: { $exists: false }}, 
        { partOfSpeech: null }]},
        function(err, doc) {
          if (!err) {
            resolve(doc)
          } else {
            reject(err)
          }
        })
    })

    promise.then(function(res) {
      ctrl.entriesNoPOS = res
      ctrl.currentPOSEntry = ctrl.entriesNoPOS[ctrl.noPOSIndex]
    })

    // frontend logic
    ctrl.noPOSIndex = 0
    ctrl.partSelection = ""

    function updatePOS() {
      return new $q(function(resolve, reject) {
        entries.findByIdAndUpdate(
          { _id: ctrl.currentPOSEntry._id },
          { $set: { partOfSpeech: ctrl.partSelection }},
          { new: true },
          function(err, doc) {
            if (err) {
              reject(err)
            } else {
              resolve(doc)
            }
          }
        )
      })
    }

    ctrl.addEntryPOS = function() {
      if (!ctrl.partSelection || ctrl.partSelection.length === 0) {
        return
      }

      updatePOS().then(function(res) {
        ctrl.updatePOSResult = res
      }, function(err) {
        ctrl.updatePOSResult = err
      })

      ctrl.posForm.$setPristine()
      ctrl.partSelection = ""

      ctrl.nextEntryPOS()
    }

    ctrl.nextEntryPOS = function() {
      if (ctrl.noPOSIndex < ctrl.entriesNoPOS.length - 1) {
        ctrl.noPOSIndex++
        ctrl.currentPOSEntry = ctrl.entriesNoPOS[ctrl.noPOSIndex]
      }
    }
  }
]

angular.module('app')
.component('posPage', {
  templateUrl: './pos-page/pos-page.template.html',
  controller: posPageController
})