var express = require('express');
var http = require('http');
var path = require('path');
var utils = require('./utils');
var lessMiddleWare = require('less-middleware');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
/*app.use(function(req, res, next){
  var url = req.originalUrl;
  if (url != 'user/login' && url != 'user/reg' && !req.session.user)
    return res.redirect('/user/login');
  next();
});*/
app.use(app.router);
app.use(lessMiddleWare({
  src: __dirname + '/public/less',
  dest: __dirname + '/public/css',
  prefix: '/css',
  compress: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

utils.route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
