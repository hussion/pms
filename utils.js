var fs = require('fs');
var me = module.exports;
var util = require('util');
var path = require('path');
// all routes here
var routes = require('./routes');
var user = require('./routes/user');

/**
 * read json file
 * @param file
 * @param callback
 */
me.readJsonFile = function(file, callback) {
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) return callback(err, null);

    try {
      var obj = JSON.parse(data);
      callback(null, obj);
    } catch (err2) {
      callback(err2, null);
    }
  });
};

/**
 * read json file Sync
 * @param file
 * @returns {*}
 */
me.readJsonFileSync = function(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

/**
 * url mapping({user/project...} / {find/edit...} / {id})
 * @param req
 * @param res
 */
me.urlMap = function(req, res) {
  var method = req.method;
  var urlArray = req.params[0].substring(1).split('/');
  var modelName = urlArray[0];
  var modelOpration = urlArray.length > 1 ? urlArray[1] : '';
  if (urlArray.length == 1 && modelOpration != '404')
    return res.redirect('/404');
  if (!fs.existsSync(path.join('./routes/', modelName, '.js')))
    return res.redirect('/404');
  if (method == 'GET') {
    require('./' + modelName).modelOpration;
  } else if (method == 'POST') {
    modelOpration = 'do' + modelOpration.substring(0,1).toUpperCase( ) + modelOpration.substring(1);
    require('./' + modelName).modelOpration;
  } else {
    return res.redirect('/404');
  }

};
