var mongoose = require('mongoose');

let strokeAnimSchema = {
  charCode: String,
  svg: String
}

module.exports = mongoose.model(
  'strokeAnimations', strokeAnimSchema, 'strokeAnimations');