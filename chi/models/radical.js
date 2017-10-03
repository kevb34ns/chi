var mongoose = require('mongoose');

let radicalSchema = {
  kangXi: String,
  traditional: String,
  simplified: String,
  variants: [String]
}

module.exports = mongoose.model('radicals', radicalSchema, 'radicals');