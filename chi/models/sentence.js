let mongoose = require('mongoose');

let sentenceSchema = {
  Chinese: String,
  English: String
}

module.exports = mongoose.model('sentences', sentenceSchema, 'sentences');