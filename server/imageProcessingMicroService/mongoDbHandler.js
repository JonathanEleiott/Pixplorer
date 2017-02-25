const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:8084/test');
 
var usersSchema = new Schema({
  name: { type: String, required: true },
  lastName: String,
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', usersSchema);


// UserData.find()
//   .then((doc) => {
//     console.log(doc);
//   });

var item = {
  name: 'John',
  lastName: 'Smith'
};
var data = new UserData(item);
data.save();

