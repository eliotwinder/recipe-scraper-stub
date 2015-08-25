var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var base_url = 'http://cooking.nytimes.com';

var getHtml = function(url, cb){
  request(url, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    if (!error && response.statusCode == 200) {
      cb(body);
    }
  });
};

// recipeNumber can be '1017585-corn-and-jalapeno-muffins' or just '1017585'
var getRecipe = function(recipeNumber, callback){
  var url = base_url + recipeNumber.toString();
  
  console.log('getting recipe for' + recipeNumber);

  getHtml(url, function(body){
    callback(parseRecipe(body));
  });
};


var getTags = function($recipe) {
  var $recipeTags = [];
  $recipe('[id*=tag]').each(function(index){
  $recipeTags.push($recipe(this).text());
  });
  return $recipeTags;
};

var getIngredients = function($recipe){
  var ingredients = [];
  $recipe('.recipe-ingredients li').each(function(){
    var quantity = $recipe(this).find('.quantity').text();
    var unitOfMeasure = $recipe(this).find('.ingredient-name').text();
    var ingredientName = $recipe(this).find('.ingredient-name span').text(); 
    ingredients.push({
      quantity: quantity,
      unitOfMeasure: unitOfMeasure,
      ingredientName: ingredientName
    });
  });
  return ingredients;
};

var getSteps = function($recipe){
  var steps = [];
  $recipe('.recipe-steps li').each(function(){
    steps.push($recipe(this).text());
  });

  return steps;
};

var parseRecipe = function(html){
  var $ = cheerio.load(html);  
  return {
    tags: getTags($),
    ingredients: getIngredients($),
    steps: getSteps($)
  };
};

module.exports = getRecipe;

// SAMPLE RECIPE
// <li itemprop="ingredients" itemscope="" itemtype="http://data-vocabulary.org/RecipeIngredient">
//   <span class="quantity">6</span>
//   <span class="ingredient-name">tablespoons <span itemprop="name">unsalted butter</span>, plus more for buttering muffin tins</span>
// </li>

// 
// TEST PARSER W THIS
// fs.readFile('./sampleRecipe.html', function (err, html) {
//   if (err) {
//       throw err; 
//   }       

//   var $ = cheerio.load(html);
//   parseRecipe(html);
// });

