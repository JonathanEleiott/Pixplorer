const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:8084/test');

const usersSchema = new Schema({
  name: { type: String, required: true },
  lastName: String,
}, { collection: 'user-data' });

const UserData = mongoose.model('UserData', usersSchema);


// UserData.find()
//   .then((doc) => {
//     console.log(doc);
//   });

const item = {
  name: 'John',
  lastName: 'Smith'
};
const data = new UserData(item);
data.save();
