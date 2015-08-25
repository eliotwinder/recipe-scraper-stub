var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  url: String,
  name: { type: String, required: true },
  ingredients: { 
    quantity: String,
    unitOfMeasure: String,
    ingredientName: String
  },
  steps: Array,
  tags: Array
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;