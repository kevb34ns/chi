let mongoose = require('mongoose');

let sentenceSchema = {
  chinese: String,
  english: String
}

module.exports = mongoose.model('sentences', sentenceSchema, 'sentences');