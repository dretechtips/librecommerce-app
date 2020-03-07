const https = require("https");

// 10 seconds
const TIMEOUT = 10000;

/**
 * @param {https.RequestOptions} options
 * @returns {() => Promise<boolean>}
 */
module.exports = async function isAvailable(options) {
  return function() {
    return new Promise((res, rej) => {
      try {
        const req = https.request({
          host: this.sandbox ? SANDBOX_API : LIVE_API,
          path: path,
          method: method
        });
        req.setTimeout(100000);
        req.on("response", res => {
          res(true);
        });
      } catch (e) {
        rej(false);
      }
    });
  };
};
