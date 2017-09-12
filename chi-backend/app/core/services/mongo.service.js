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
      partOfSpeech: String,
      tRadical: String,
      sRadical: String,
      tStrokes: String,
      sStrokes: String
    };
    
    let entry = mongoose.model('entries', entrySchema, 'dictionary');

    let radicalSchema = {
      kangXi: { type: String, index: true },
      traditional: { type: String },
      simplified: { type: String },
      variant1: { type: String },
      variant2: { type: String }
    };

    let radical = mongoose.model('radicals', radicalSchema, 'radicals');

    return {
      entryDb: function() {
        return entry;
      },

      radicalDb: function() {
        return radical;
      }
    }
  }
])