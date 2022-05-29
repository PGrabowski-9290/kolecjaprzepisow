const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const recipeSchema = Schema({
  author_name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
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
      body: String,
      date:{ 
        type: Date, 
        default: Date.now
      }
    }
  ]
})

module.exports = Recipe = mongoose.model("Recipes",recipeSchema);