var db = require('../config');

var crypto = require('crypto');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var urlSchema = mongoose.Schema({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', urlSchema);

urlSchema.pre('save', function(model, attrs, options) {
  var shasum = crypto.createHash('sha1');
  shasum.update(model.get('url'));
  model.set('code', shasum.digest('hex').slice(0, 5));
});


// {
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
  // },
  // initialize: function() {
  //   this.on('creating', function(model, attrs, options) {
  //     var shasum = crypto.createHash('sha1');
  //     shasum.update(model.get('url'));
  //     model.set('code', shasum.digest('hex').slice(0, 5));
  //   });
  // }
// })


module.exports = Link;
