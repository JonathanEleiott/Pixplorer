const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  imageLabel: { type: String, required: true, unique: true },
  s3ImageLocation: String,
  GoogleVisionResultLabels: String,
}, { collection: 'img' });

const compareImageLabels = function (referenceImageFromDBLabels, newImageLabels) {
  referenceImageFromDBLabels = JSON.parse(referenceImageFromDBLabels);
  const comaprisonObjectFilter = {};
  let similarityScore = 0;

  referenceImageFromDBLabels.forEach((label) => {
    comaprisonObjectFilter[label] = true;
  });

  newImageLabels.forEach((label) => {
    if (comaprisonObjectFilter[label]) {
      similarityScore += 1;
    }
  });
  console.log('Similarity Score: ', similarityScore / referenceImageFromDBLabels.length);
  return similarityScore / referenceImageFromDBLabels.length >= 0.5;
};

module.exports = {
  userData: mongoose.model('UserData', usersSchema),

  setImage: function (username, imageLabel, fieldToUpdate, data) {
    const query = { imageLabel, username };
    const update = { [fieldToUpdate]: JSON.stringify(data) };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    this.userData.findOneAndUpdate(query, update, options, (error, result) => {
        console.log('RESULT', result);
        result = result || new this.userData(query);
        
        result.save((error, success) => {
          if (error) {
            console.log('ERROR on SAVE', error);
          } else {
            console.log('SUCCESS on SAVE', success);
          }
        });
    });
  },

  compareImage: function(username, imageLabel, fieldToUpdate, data, callback) {
    const query = { imageLabel };
    this.userData.findOne(query, {}, (err, imageFromDB) => {
      if (err) {
        console.log('Error finding the image', error);
        callback(404, 'Error finding the image!');
      } else {
        console.log('Image Found!', 'FROM MONGO: ', imageFromDB.GoogleVisionResultLabels, 'FROM GOOGLE: ', data);
        console.log('IMAGES ARE THE SAME: ', compareImageLabels(imageFromDB.GoogleVisionResultLabels, data));
        callback(200, 'IMAGE FOUND!');
      }
    });
  }
};

