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
      sStrokes: String,
      tMeasureWords: [String],
      sMeasureWords: [String]
    };
    
    let entry = mongoose.model('entries', entrySchema, 'dictionary');

    let radicalSchema = {
      kangXi: { type: String, index: true },
      traditional: { type: String },
      simplified: { type: String },
      variants: { type: [String] }
    };

    let radical = mongoose.model('radicals', radicalSchema, 'radicals');

    let strokeAnimSchema = {
      charCode: String,
      svg: String
    }

    let strokeAnim = mongoose.model(
      'strokeAnimations', strokeAnimSchema, 'strokeAnimations');


    return {
      entryDb: function() {
        return entry;
      },

      radicalDb: function() {
        return radical;
      },

      strokeAnimDb: function() {
        return strokeAnim;
      }
    }
  }
])