const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
const config = require('./config');

const generateToken = config => {
  return new AccessToken(
    "ACa8db994fcc2c57720388517c01116478",
    "SK9c6ad8c71505c91c93cab20f2e961e99",
    "AOdbPSvyIOAhEfKBTNPAgH2pHoudv9qN"
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

module.exports = { videoToken };
