var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test");

var entries = require('../models/entry');
var radicals = require('../models/radical');
var strokeAnimations = require('../models/strokeAnimation');
var sentences = require('../models/sentence')

// The web server API endpoints
router.get('/', function(req, res) {
  res.send("Welcome to the Chi API!");
});

router.get('/search/:query', function(req, res) {
  entries.find({$text: {
    $search: req.params.query,
    $language: "en"
  }},
  { "score": { "$meta": "textScore" } },	
  function(err, doc) {
    if (!err) {
      res.send(doc);
    } 
  })
  .sort({ "score": { "$meta": "textScore"}});
});

// TODO bug: there are terms where traditional is different but simplified is
// the same, resulting in two separate entries being merged (see ci2 (phrase))
router.get('/term/:term', function(req, res) {
  entries.find({$or: [
    {traditional: req.params.term}, 
    {simplified: req.params.term}]},
    function(err, doc) {
      if (!err) {
        console.log (doc);
        res.send(doc);
      } 
    }
  );
});

router.get('/radical/:kangXi', function(req, res) {
  radicals.findOne({ kangXi: req.params.kangXi },
    function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    });
});

router.get('/strokes/:charCode', function(req, res) {
  strokeAnimations.findOne({ charCode: req.params.charCode },
    function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    });
});

router.get('/sentences/:query', function(req, res) {
  let query = new RegExp(req.params.query);
  sentences.find({ Chinese: { $regex: query }},
    null,
    { limit: 5 },
    function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    });
});

module.exports = router;