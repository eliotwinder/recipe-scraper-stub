var Recipe = require('./RecipeSchema');

module.exports.addRecipe = function(recipeData){
  //Add new user to databasemove
  var recipe = new Recipe(recipeData);
  recipe.save(function(err, recipe){
    if(err) console.log(err);
    else{
      console.log("Recipe added!");
      callback(recipe);
    }
  });
};