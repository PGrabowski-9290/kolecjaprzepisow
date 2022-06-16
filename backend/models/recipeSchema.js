const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const recipeSchema = Schema({
  author_name: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  dish_type: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  prepare_time:{
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: String,
      amount: Number,
      unit: String
    }
  ],
  comments: [
    {
      author: String,
      text: String,
      date: String
    }
  ]
})

module.exports = Recipe = mongoose.model("Recipes",recipeSchema, 'recipes');