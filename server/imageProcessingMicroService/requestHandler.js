const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const axios = require('axios');
const Q = require('q');

mongoose.connect('mongodb://localhost/test');
 
const usersSchema = new Schema({
  username: { type: String, required: true },
  s3ImageLocation: String,
  GoogleVisionResultLabels: String,
}, {collection: 'imagerecognition2'});

const UserData = mongoose.model('UserData', usersSchema);

const gcloud = require('google-cloud');
const headers = require('./headers');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../../aws-config.json');
const s3 = new AWS.S3();

const vision = gcloud.vision({
  projectId: 'thesis-de1f8',
  keyFilename: 'googleCloudKeys.json'
}); 

const sendResponse = function (res, statusCode, headersSent, responseMessage) {
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

const getImageBuffer = function (imageFromRequestBody) {
  return new Buffer(imageFromRequestBody, 'base64');
};

const updateMongo = function (userId, fieldToUpdate, data) {
  const query = { _id: userId };
  const update = { [fieldToUpdate]: JSON.stringify(data) };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  UserData.findOneAndUpdate(query, update, options, (error, result) => {
      if (error) return;
      console.log(result);
      // do something with the document
  });

  // newUser.save((error, user) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     UserData.update(
  //       { _id: user.id }, 
  //       // new UserData({username: username}),
  //       {  },
  //       (err, succ) => {
  //         console.log('UPDATE ERROR OR SUCCESS', err, succ);
  //       }
  //     );
  //   }
  // });
};

const analyzeImageViaGoogleVision = function (image, callback) {
  vision.detectLabels(image)
    .then((results) => {
      console.log(results);
      callback(['success', results[0]]);
      // const labels = results[0];
      // labels.forEach((label) => console.log(label));
    })
    .catch((error) => {
      callback(['error', error]);
    });
};

const uploadImageToS3 = function (imageBuffer, callback) {
  const randomImageName = `Dan-${Math.random().toString().slice(2)}.jpg`;

  const params = {
    Bucket: 'set-image-folder',
    Key: randomImageName,
    Body: imageBuffer
  };

  s3.upload(params, (err, data) => {
    if (data) {
      console.log('Upload Success ', data.Location);
      callback(['success', data.Location]);
    } if (err) {
      console.log('Upload Error ', err);
      callback(['error', err]);
    } 
  }); 
};

module.exports = {
  landing: (req, res) => { 
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.landing)`);
    sendResponse(res, 200, headers, 'Welcome the image service for Crustaceans thesis project!');
  },

  setImage: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.postImage)`);
    const imageBuffer = getImageBuffer(req.body.imageBuffer);
  
    const item = {
      username: 'Dan',
    };
    const newUser = new UserData(item);

    newUser.save((error, user) => {
      if (error) {
        console.log(error);
      } else {
        uploadImageToS3(imageBuffer, (s3ImageLocation) => {
          if (s3ImageLocation[0] === 'error') {
            console.log('Error storing to S3');
            sendResponse(res, 404, headers, 'Error storing to S3');
          } else {
            updateMongo(user.id, 's3ImageLocation', s3ImageLocation[1]);
          }
        });

        analyzeImageViaGoogleVision(imageBuffer, (resultLabels) => {
          if (resultLabels[0] === 'error') {
            console.log('Error storing to S3');
            sendResponse(res, 404, headers, 'Error storing to S3');
          } else {
            updateMongo(user.id, 'GoogleVisionResultLabels', resultLabels[1]);
          }
        });
      }
    });
  }
};

