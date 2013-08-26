var fs = require('fs');
var me = module.exports;

// all routes here
var index = require('./routes');
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
 * route handle
 * @param app
 */
me.route = function(app) {
  // get
  app.get('/user/login', user.login);
  app.get('/user/reg', user.reg);
  app.get('/user/find_password', user.findPassword);

  //post
  app.post('/user/login', user.doLogin);
  app.post('/user/reg', user.doReg);
  app.post('/user/find_password', user.doFindPassword);

  //404
  app.get('*', index.notFind);
}

