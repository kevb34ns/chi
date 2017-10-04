var mongoose = require('mongoose');

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
  measureWords: [[String]]
};

module.exports = mongoose.model('entries', entrySchema, 'dictionary');