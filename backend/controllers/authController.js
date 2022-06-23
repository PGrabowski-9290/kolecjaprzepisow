const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');

const jwt = require('jsonwebtoken');
require('dotenv').config();
 
const handleRegister = async (req, res) => {
  const {name, password, email} = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({message: "Data required"});
  }
  
  const duplicateUser = await UserService.getUserByEmail(email);
  console.log(duplicateUser, email)
  if (duplicateUser)
    return res.status(400).json({message: "Email already in use"});

  try {
    const hash_pass = await bcrypt.hash(password, 10);
    const createdUser = await UserService.createUser(name, email, hash_pass);
    console.log(createdUser)
    if (createdUser?.error){
      throw createdUser?.error
    }
    res.status(200).json({
      user: {
        _id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        roles: createdUser.roles,
        token: ''
      },
      message: "Success"
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Couldn't create user",error})
  }
}


const handleLogin = async (req, res, next) => {
  const {email, password} = req.body; 
  try {
    if( !email || !password )
      return res.status(400).json({message: 'Username and password required'});

    const userFound = await UserService.getUserByEmail(email);
    if (!userFound) return res.status(401).json({message: 'Wrong username or password'});
    console.log(userFound)
    const match = await bcrypt.compare(password, userFound.hash_pass);
    if (match) {
      const roles = Object.values(userFound.roles).filter(Boolean);
      console.log(roles)

      const accessToken = jwt.sign({ 
        "UserInfo": {
          "email": userFound.email,
          "roles": roles
        }
       },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 15})

      const refreshToken = jwt.sign(
        { "mail": userFound.mail},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'})

      userFound.refreshToken = refreshToken

      const result = await UserService.updateUser(userFound)
      console.log(result)
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json(
        {
          user: {
            _id: userFound._id.toString(),
            name: userFound.name,
            email: userFound.email,
            roles: roles,
            accessToken: accessToken
          }
        });
    } else {
      res.status(401).json({message: "Wrong username or password"});
    } 
  }catch (error) {
    res.status(500).json({message: `Error authenticating ${error}`});
  }
}

const handleLogout = async (req,res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.status(204).json({message: "Success"})

  const refreshToken = cookies.jwt

  const foundUser = UserService.findByToken(refreshToken)

  if(!foundUser) {
    res.clearCookie('jwt',{httpOnly: true, secure: true, sameSite: 'None'})
    return res.status(204).json({message: 'Success'})
  }

  foundUser.refreshToken = ''
  const result = UserService.updateUser(foundUser)
  console.log(result)

  res.clearCookie('jwt', 'none', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(204).json({message: "Logged Out"})
}

module.exports = { handleLogin, handleRegister, handleLogout }