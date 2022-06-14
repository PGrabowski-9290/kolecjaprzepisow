const User = require('../models/userSchema');
  const getUserById = async (id) => {
    try {
      const user = await User.findById(id).select('-hash_pass');
      return user;
    } catch (error) {
      return {
        message: "Nie znaleziono uzytkownika z podanym adresem",
        error: error
      }
    }
  }

  const getUserByEmail = async(email) =>{
    try {
      const sanitizedEmail = email.toLowerCase();
      const user = await User.findOne({mail: sanitizedEmail});
      return user;
    } catch (error) {
      return {
        message: "Nie znaleziono uzytkownika z podanym adresem",
        error: error
      }
    }
  }

  const createUser = async (name, email, password) => {
    try {
      const sanitizedEmail = email.toLowerCase();
      const newUser = {
        name: name,
        email: sanitizedEmail,
        hash_pass: password,
      }

      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      return {
        message: "Nie dodano nowego usera",
        error: error
      }
    }
  }

  const updateUser = async (userData) => {
    try{
      const result = await User.updateOne({_id: userData._id}, userData)
      return result
    }catch(error) {
      return {
        message: "Błąd aktualizacji użytkownika",
        error: error
      }
    }
  }

  const findByToken = async (refreshToken) => {
    return await User.findOne({refreshToken}).exec()
  }

module.exports = {getUserByEmail, updateUser, createUser, getUserById, findByToken};