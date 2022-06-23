const RecipeService = require('../services/RecipeService');

const getFilteredRecipes = async (req, res) => {
  try {
    const {dishType, diff, author} = req.query || null
    const filterObj = {
      $and: []
    }
    if(dishType){
      if (dishType.length > 1){
        var or = { $or: [] }

        for(let i = 0; i < dishType.length; i++){
          or.$or.push({dish_type: dishType[i]})
        }
        filterObj.$and.push(or)
      }else{
        filterObj.$and.push({dish_type: dishType[0]})
      }
    }

    if(diff){
      if (diff.length > 1){
        var or = { $or: [] }        
        for(let i = 0; i < diff.length; i++){ 
          or.$or.push({'difficulty': diff[i]})
        }
        filterObj.$and.push(or)
      }else{
        filterObj.$and.push({'difficulty': diff[0]})
      }
    }

    if(author){
      filterObj.$and.push({author_name: author})
    }

    const recipes = await RecipeService.getFilteredRecipes(filterObj)

    res.json(recipes)
  } catch(err) {
    console.log(err)
    res.status(500).send(err);
  }
}

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

const addComment = async (req, res) => {
  try {
    const {author,text} = req.body;
    console.log(req)
    let recipeId = req.params.id;
    const comment = {
      author: author,
      text: text,
      date: new Date().toISOString()
    }

    var recipe = await RecipeService.getRecipeById(recipeId);

    recipe.comments.sort((a,b)=>new Date(b.date) - new Date(a.date))
    if (recipe.comments.length >= 5){
      console.log("usuwam");
      recipe.comments.pop()
    }
    recipe.comments.unshift(comment)

    const respose = await RecipeService.updateRecipe(recipeId, recipe)
    res.status(200).json({message: "Success"});
  } catch(err) {
    res.status(500).json({err});
  }
}

const deleteComment = async (req, res) => {
  const {id, commentId} = req.params
  try {
    let recipe = await RecipeService.getRecipeById(id);
    recipe.comments = recipe.comments.filter(comment => comment._id != commentId)
    const response = await RecipeService.updateRecipe(id, recipe)
    res.status(200).json({message: "Success"})
  } catch(err) {
    res.status(500).json({err})
  }
}

module.exports = { getAllRecipes, getRecipeById, getFilteredRecipes, createRecipe, deleteRecipe, updateRecipe, addComment, deleteComment }