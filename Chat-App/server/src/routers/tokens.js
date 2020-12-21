const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
const config = require('./config');

const generateToken = config => {
  return new AccessToken(
    "ACa8db994fcc2c57720388517c01116478",
    "SK3fb5c5b65a62207a0c8b9725ddc3555b",
    "MK7C7vCoAT2DwhjquGYdKuUOAfq875vG"
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  console.log(room);
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  console.log("here");
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

module.exports = { videoToken };
