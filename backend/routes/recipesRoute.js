const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipeController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../configs/roles');

router.get('/', RecipeController.getAllRecipes);
router.post('/',verifyJWT,verifyRoles(ROLES_LIST.User,ROLES_LIST.Editor, ROLES_LIST.Admin),  RecipeController.createRecipe);
router.get('/:id', RecipeController.getRecipeById);
router.delete('/delete:id',verifyRoles(ROLES_LIST.Admin), RecipeController.deleteRecipe);
//router.put('/recipe/:id', RecipeController.updateRecipe);

module.exports = router;