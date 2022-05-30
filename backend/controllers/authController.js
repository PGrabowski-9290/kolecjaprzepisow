const bcrypt = require('bcrypt');
const e = require('express');
const UserService = require('../services/UserService');

const jwt = require('jsonwebtoken');
require('dotenv').config();
 
const handleRegister = async (req, res, next) => {
  const {name, password, confirmPassword, email} = req.body;
  if (!name || !password || !email || !confirmPassword) {
    return res.status(400).json({message: "Data required"});
  }
  
  const duplicateUser = await UserService.getUserByEmail(email);
  if (duplicateUser)
    return res.status(400).json({message: "Email already in use"});

  if (confirmPassword !== password) {
    return res.status(400).json({message: "Passwords do not match"});
  }
  try {
    const hash_pass = await bcrypt.hash(password, 10);
    const createdUser = await UserService.createUser(name, email, hash_pass);

    res.json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.mail,
      role: createdUser.role,
      token: generateToken(userFound._id)
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Couldn't create user'"})
  }
}


const handleLogin = async (req, res, next) => {
  const {email, password} = req.body; 
  try {
    if( !email || !password )
      return res.status(400).json({message: 'Username and password required'});

    const userFound = await UserService.getUserByEmail(email);
    const match = await bcrypt.compare(password, userFound.hash_pass);
    if (match && userFound) {
      res.status(200).json(
        {
          _id: userFound._id.toString(),
          name: userFound.name,
          email: userFound.mail,
          role: userFound.role,
          token: generateToken(userFound._id)
        });
    } else {
      res.status(401).json({message: "Unauthorized"});
    } 
  }catch (error) {
    res.status(500).json({message: `Error authenticating ${error}`});
  }
}

//get logged user data
const getUserData = async (req, res) => {
  res.status(200).json(req.user)
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'})
}

module.exports = { handleLogin, handleRegister, getUserData }