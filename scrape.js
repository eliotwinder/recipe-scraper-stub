var cheerio = require('cheerio');
var request = require('request');
// var $ = require('jquery');

var base_url = 'http://cooking.nytimes.com/search?q=&page=';

var getHtml = function(url, cb){
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(body);
    }
  });
}

for(var i = 0; i < 10; i++){
  var url = base_url + i.toString();
  
  getHtml(url, function(body){
    // console.log(body);
    var $recipe = cheerio.load(body);
    var $recipeDivs = $recipe('.recipe-card');
    for(var recipe = 0; recipe < $recipeDivs.length; recipe++){
      console.log($recipeDivs[recipe].attribs['data-url']);
    }
  })
}




