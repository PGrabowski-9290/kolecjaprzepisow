const Recipe = require('../models/recipeSchema');

const getAllRecipes = async () => {
  try{
    const allRecipes = await Recipe.find();
    return allRecipes;
  } catch(err){
    console.error(`Nie można było pobrać przepisow ${err}`);
  }
}

const createRecipe = async (data) => {
  try {
    const newRecipe = {
      author_name: data.author_name,
      user_id: data.user_id,
      dish_type: data.dish_type,
      difficulty: data.difficulty,
      prepare_time: data.prepare_time,
      photo: data.photo,
      title: data.title,
      body: data.body,
      ingredients: data.ingredients,
      comments:[]
    }

    const response = await new Recipe(newRecipe).save();
    return response;
  } catch (err) {
    console.error(err);
  }
}

const getRecipeById = async (id) => {
  try {
    const singleRecipeResponse = await Recipe.findById({_id: id});
    return singleRecipeResponse;
  } catch (err) {
    console.error(`Nie znaleziono przepisu. ${err}`);
  }
}

const deleteRecipe = async (id) => {
  try {
    const deletedResponse = await Recipe.findOneAndDelete({_id: recipeId});
    return deletedResponse;
  } catch (err) {
    console.error(`Nie można usunąć przpepisu. ${err}`);
  }
}

const updateRecipe = async (recipeId,data) => {
  try {
    const updatedResponse = await Recipe.findOneAndUpdate({_id: recipeId}, data);
    return updatedResponse;
  } catch (err) {
    console.error(`Nie można zaktualizować przepisu. ${err}`);
  }
}

module.exports = { getAllRecipes , createRecipe, getRecipeById, deleteRecipe, updateRecipe };