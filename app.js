var getRecipeUrls = require('./getRecipeUrls');
var getRecipe = require('./getRecipe');
var db = require('./db/config.js')
var Recipe = require('./db/RecipeSchema.js')
var dbUtils = require('./db/dbUtils.js')

// get a batch of recipe urls
var getPage = function(pageNumber, callback) {
  getRecipeUrls(1,function(urls){
    var recipes = [];
    var undefinedUrls = 0; 
    // request the html and parse it
    urls.forEach(function(url){
      if (url !== undefined){
        getRecipe(url, function(recipe){
          recipes.push(recipe);
          if (recipes.length === urls.length - undefinedUrls) {
            callback(recipes);
          } 
        });
      } else {
        undefinedUrls++;
      }
    });
  });
};

for (var j = 20; j < 60; j++){
  getPage(j, function(recipes){
    for (var i = 0; i < recipes.length; i++){
      dbUtils.addRecipe(recipes[i]);
    }
  });
}