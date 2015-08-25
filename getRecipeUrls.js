var cheerio = require('cheerio');
var request = require('request');
// var $ = require('jquery');

var base_url = 'http://cooking.nytimes.com/search?q=&page=';

var getHtml = function(url, cb){
  request(url, function (error, response, body) {
    if (error){
      console.log(error);
    }
    if (!error && response.statusCode == 200) {
      cb(body);
    }
  });
};

var getRecipeUrls = function(pageNumber, callback){
  var url = base_url + pageNumber.toString();
  
  getHtml(url, function(body){
    var urls = [];
    var $recipe = cheerio.load(body);
    var $recipeDivs = $recipe('.recipe-card');
    for(var recipe = 0; recipe < $recipeDivs.length; recipe++){
      urls.push($recipeDivs[recipe].attribs['data-url']);
    }

    callback(urls);
  });
};

module.exports = getRecipeUrls;

// getRecipeUrls(base_url + 1, function(x){
//   console.log(x);
// });



