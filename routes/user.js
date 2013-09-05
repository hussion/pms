/**
 * user routes
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * To Login
 * @param req
 * @param res
 */
exports.login = function(req, res) {
  res.render('login', {title: 'Login'});
};

/**
 * Login System
 * @param req
 * @param res
 * @param next
 */
exports.doLogin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user) {
    if (err) return next(err);

    if (user == null)
      return res.json({'result':'error'});
    else
      req.session.user = user;
      res.locals.user = user;
      return res.redirect('/project/list');
  });
};

/**
 * To Reg
 * @param req
 * @param res
 */
exports.reg = function(req, res) {
  res.render('reg', {title: 'registry'});
};

/**
 * Reg User
 * @param req
 * @param res
 * @param next
 */
exports.doReg = function(req, res, next) {
  req.body.user.role = 'member';
  var user = new User(req.body.user);
  user.save(function(err) {
    if (err) return next(err);
    res.redirect('/user/login');
  });
};

/**
 * To Find Password
 * @param req
 * @param res
 */
exports.findPassword = function(req, res) {
  res.render('find-password', {title: 'Find Password'});
};

/**
 * Send password to User's Mailbox
 * @param req
 * @param res
 * @param next
 */
exports.doFindPassword = function(req, res, next) {
  User.findOne({username: req.body.username, email: req.body.email}, function(err, user) {
    if (err) return next(err);

    if (!user)
      res.json({'result' : 'notMatch'});
    else
      //send mail to user's mailbox
      res.send();
  });
};