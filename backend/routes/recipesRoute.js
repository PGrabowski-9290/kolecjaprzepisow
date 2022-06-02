const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware')


router.get('/', RecipeController.getAllRecipes);
router.post('/', protect, RecipeController.createRecipe);
router.get('/recipe/:id', RecipeController.getRecipeById);
router.delete('/recipe/:id', protect, RecipeController.deleteRecipe);
//router.put('/recipe/:id', RecipeController.updateRecipe);

module.exports = router;