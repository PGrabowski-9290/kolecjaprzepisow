const whitelist = [ 
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    // console.log(origin);
    // callback(null, true)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;