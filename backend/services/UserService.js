const User = require('../models/userSchema');
  const getUserById = async (id) => {
    try {
      const user = await User.findById(id).select('-hash_pass');
      return user;
    } catch (error) {
      console.error(`Nie znaleziono uzytkownika z podanym adresem ${error}`);
    }
  }

  const getUserByEmail = async(email) =>{
    try {
      const sanitizedEmail = email.toLowerCase();
      const user = await User.findOne({mail: sanitizedEmail});
      return user;
    } catch (error) {
      console.error(`Nie znaleziono uzytkownika z podanym adresem ${error}`);
    }
  }

  const createUser = async (name, email, password) => {
    try {
      const sanitizedEmail = email.toLowerCase();
      const newUser = {
        name: name,
        mail: sanitizedEmail,
        hash_pass: password,
        role: "user",
        refreshToken: [""]
      }

      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      console.error(`Nie dodano nowego usera ${error}`);
    }
  }

  const updateUser = async(name, email, password) => {}


module.exports = {getUserByEmail, updateUser, createUser, getUserById};