exports.list = function(req, res) {
  res.render('project-list', {title: 'Project List'});
};

exports.main = function(req, res) {
  res.render('project-main',  {title: 'Project Main'});
};