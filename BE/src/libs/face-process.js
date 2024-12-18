const faceapi = require("face-api.js");

async function LoadModels() {
  console.log(__dirname);
  // Load the models
  // __dirname gives the root directory of the server
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models");
}

function getDistanceFace(faceDescriptor1, faceDescriptor2) {
  if (faceDescriptor1.length !== faceDescriptor2.length) {
    console.error("Face descriptors have different lengths");
    return false;
  }

  const distance = faceapi.euclideanDistance(faceDescriptor1, faceDescriptor2);
  return distance; // Face match threshold
}

module.exports = {
  LoadModels,
  getDistanceFace,
};
