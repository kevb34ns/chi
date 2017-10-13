let mongoose = require('mongoose');

let sentenceSchema = {
  cmn: String,
  eng: String
}

module.exports = mongoose.model('sentences', sentenceSchema, 'sentences');