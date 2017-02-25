const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  //imageLabel: { type: String, required: true, unique: true },
  s3ImageLocation: String,
  GoogleVisionResultLabels: String,
}, { collection: 'img' });
//const UserData = 

module.exports = {
  userData: mongoose.model('UserData', usersSchema),

  updateMongo: function (user, fieldToUpdate, data) {
    const query = { username: user };
    const update = { [fieldToUpdate]: JSON.stringify(data) };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    this.userData.findOneAndUpdate(query, update, options, (error, result) => {
        if (!error) {
          if (!result) {
            result = new this.userData(query);
          }
        }

        result.save((error, document) => {
          if (!error) {
            console.log(document);
          } else {
            console.log(error);
          }
        });
    });
  },
};

