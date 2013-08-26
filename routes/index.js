/*
 * GET home page.
 */

exports.notFind = function(req, res){
  res.status(404);
  res.render('404', { title: 'Not Find' });
};