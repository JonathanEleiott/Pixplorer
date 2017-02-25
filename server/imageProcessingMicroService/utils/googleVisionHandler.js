const gcloud = require('google-cloud');

const vision = gcloud.vision({
  projectId: 'thesis-de1f8',
  keyFilename: './googleCloudKeys.json'
}); 


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

module.exports = analyzeImageViaGoogleVision;
