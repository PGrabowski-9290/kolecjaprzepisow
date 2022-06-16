const RecipeService = require('../services/RecipeService');


const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeService.getAllRecipes();
    if(!recipes){
      res.status(404).json("Brak przepisow!");
    }
    res.json(recipes);
  } catch(err){
    res.status(500).json({error: err});
  }
}

const getRecipeById = async (req, res) => {
  try {
    let id = req.params.id || "";
    const recipe = await RecipeService.getRecipeById(id);
    console.log(recipe);
    if(!recipe){
      res.status(404).json("Brak przepisu!");
    }
    res.json(recipe);
  } catch(err) {
    res.status(500).json({error: err});
  }
}

const createRecipe = async (req, res) => {
  try {
    console.log(req.body);
    const createdRecipe = await RecipeService.createRecipe(req.body);
    res.json(createdRecipe);
  } catch(err) {
    res.status(500).json({error: err});
  }
}

const deleteRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const deleteResponse = await RecipeService.deleteRecipe(recipeId);
    res.json(deleteResponse);
  } catch(err) {
    res.status(500).json({error: err});
  }
}

const updateRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    console.log(req.body);
    const updateResponse = await RecipeService.updateRecipe(recipeId, req.body);
    res.status(200).json(updateResponse);
  } catch(err) {
    res.status(500).json({error: err});
  }

}

module.exports = { getAllRecipes, getRecipeById, createRecipe, deleteRecipe, updateRecipe }