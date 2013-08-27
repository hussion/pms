var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
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
  creator : {type: ObjectId, ref: User},
  description : String,
  date : Date,
  progress: Number,
  actor: Array
});

// model
mongoose.model('User', User);
mongoose.model('Project', Project);

// db connection
mongoose.connect('mongodb://localhost/pms');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'mongoDB connected error !'));
db.once('open',function(){
  console.log('mongoDB connected success !')
});


