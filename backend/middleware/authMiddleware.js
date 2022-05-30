const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const protect = async (req,res,next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.user = await UserService.getUserById(decoded.id);
      
      next();
    } catch (error) {
      console.log(error)
      res.status(401).json({message: 'Not authorized'})
    }
  }

  if(!token) {
    res.status(401).json({message: 'Not authorized, no token available'})
  }
}

module.exports = { protect }