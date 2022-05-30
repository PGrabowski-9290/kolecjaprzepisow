const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipeController');

router.get('/', RecipeController.getAllRecipes);
router.post('/', RecipeController.createRecipe);
router.get('/recipe/:id', RecipeController.getRecipeById);
router.delete('/recipe/:id', RecipeController.deleteRecipe);
//router.put('/recipe/:id', RecipeController.updateRecipe);

module.exports = router;