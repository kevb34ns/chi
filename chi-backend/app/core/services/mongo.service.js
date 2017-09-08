angular.module('app')
.factory('MongoService', [
  function() {
    let mongoose = require('mongoose');
    mongoose.connect("mongodb://localhost/test", {
      useMongoClient: true
    })

    let entrySchema = {
      traditional: String,
      simplified: String,
      pinyin: String,
      definitions: [String],
      partOfSpeech: String
    }
    
    let model = mongoose.model('entries', entrySchema, 'dictionary') 

    return {
      db: function() {
        return model
      }
    }
  }
])