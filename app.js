var getRecipeUrls = require('./getRecipeUrls');
var getRecipe = require('./getRecipe');

// get a batch of urecipe urls
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

// getPage(10, function(recipes){
//   console.log(recipes);
// });
