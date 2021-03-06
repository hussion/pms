var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

require('./db');
var utils = require('./utils');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('pms'));
app.use(express.session());
app.use(express.compress());
app.use(app.router);
app.use('/static', express.static(path.join(__dirname, 'public')));
/*app.use(function(req, res, next){
  var url = req.originalUrl;
  if (url != '/user/login' && url != '/user/reg' && !req.session.user)
    return res.redirect('/user/login');
  next();
});*/


app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

utils.route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
