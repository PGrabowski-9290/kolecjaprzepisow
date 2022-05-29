const Recipe = require('../models/recipeSchema');

module.exports = class RecipeService{
  static async getAllRecipes(){
    try{
      const allRecipes = await Recipe.find();
      return allRecipes;
    } catch(err){
      console.error(`Nie można było pobrać przepisow ${err}`);
    }
  }

  static async createRecipe(data){
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

  static async getRecipeById(recipeId){
    try {
      const singleRecipeResponse = await Recipe.findById({_id: recipeId});
      return singleRecipeResponse;
    } catch (err) {
      console.error(`Nie znaleziono przepisu. ${err}`);
    }
  }

  // TODO update recipe, jak to działą
  // static async updateRecipe(recipe)

  static async deleteRecipe(recipeId) {
    try {
      const deletedResponse = await Recipe.findOneAndDelete({_id: recipeId});
      return deletedResponse;
    } catch (err) {
      console.error(`Nie można usunąć przpepisu. ${err}`);
    }
  }
}