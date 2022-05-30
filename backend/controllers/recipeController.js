const RecipeService = require('../services/RecipeService');

module.exports = class Recipe{
  
  static async getAllRecipes(req, res, next){
    try {
      const recipes = await RecipeService.getAllRecipes();
      if(!recipes){
        res.status(404).json("Brak przepis!");
      }
      res.json(recipes);
    } catch(err){
      res.status(500).json({error: err});
    }
  }

  static async getRecipeById(req, res, next){
    try {
      let id = req.params.id || {};
      const recipe = await RecipeService.getRecipeById(id);
      res.json(article);
    } catch(err) {
      res.status(500).json({error: err});
    }
  }

  static async createRecipe(req, res, next){
    try {
      console.log(req.body);
      const createdRecipe = await RecipeService.createRecipe(req.body);
      res.json(createdRecipe);
    } catch(err) {
      res.status(500).json({error: err});
    }
  }

  static async deleteRecipe(req,res, next){
    try {
      let recipeId = req.params.id;
      const deleteResponse = await RecipeService.deleteRecipe(recipeId);
      res.json(deleteResponse);
    } catch(err) {
      res.status(500).json({error: err});
    }
  }
}