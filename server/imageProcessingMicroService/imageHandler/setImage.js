const mongoHandler = require('../utils/mongoDbHandler');
const headers = require('../utils/headers');
const uploadImageToS3 = require('../utils/awsS3handler').uploadImageToS3;
const analyzeImageViaGoogleVision = require('../utils/googleVisionHandler');
const sendResponse = require('../utils/sendResponse.js');

const getImageBuffer = function (imageFromRequestBody) {
  return new Buffer(imageFromRequestBody, 'base64');
};

module.exports = (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.postImage)`);
    const imageBuffer = getImageBuffer(req.body.imageBuffer);
    const imageLabel = req.body.imageLabel || 'Red Bull Can';
    const username = req.body.username || 'Dan';

    // const newUser = new updateMongo.userData(item);
    const sendToS3andGoogleVision = function (username) {
      uploadImageToS3(imageBuffer, (s3ImageLocation) => {
        if (s3ImageLocation[0] === 'error') {
          console.log('Error storing to S3');
          sendResponse(res, 404, headers, 'Error storing to S3');
        } else {
         mongoHandler.setImage(username, imageLabel, 's3ImageLocation', s3ImageLocation[1]);
        }
      });

      analyzeImageViaGoogleVision(imageBuffer, (resultLabels) => {
        if (resultLabels[0] === 'error') {
          console.log('Error storing to S3');
          sendResponse(res, 404, headers, 'Error storing to S3');
        } else {
         mongoHandler.setImage(username, imageLabel, 'GoogleVisionResultLabels', resultLabels[1]);
        }
      });
    };

    sendToS3andGoogleVision(username);
};
