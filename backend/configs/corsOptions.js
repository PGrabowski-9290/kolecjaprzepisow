const allowed = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    // console.log(origin);
    // callback(null, true)
    if (allowed.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;