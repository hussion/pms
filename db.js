var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  nickname: String,
  username: String,
  password: String,
  email: String,
  tel: String,
  role: String
});

var Project = new Schema({
  name: String,
  creator : {type: Schema.ObjectId, ref: User},
  description : String,
  date : Date,
  progress: Number,
  actor: Array
});

mongoose.model('User', User);
mongoose.model('Project', Project);


