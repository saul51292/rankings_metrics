var request = require("request");
var prompt = require('prompt');
var https = require('https');

//////////////// Facebook

var FB = require('fb');
FB.setAccessToken('CAAWd7KRaZAyIBAMvZCkmDLmnZAYoXGrLETCssaB7DiKuwwkQXZBIubHeeRFhZCsihllTvu5xv3IciHNsys20vC915UIWFwa61QyZAujiBlyK2YUVBE3E4CrWkAa039kZA1fZCQodWlUT1Yw4hGNcpB3zQybivQ33VeFLDAcKZCPv6nCgrLGfuvh0VagXYAAZB2NvYZD');

//////////////// Twitter

var Twitter = require('twitter');
 var client = new Twitter({
  consumer_key: '2pCD1DQb4ko2ghWPdXpZpDY5C',
  consumer_secret: 'jt2rH0GAPki055Pv9aBstHFFDv1f10gIqKU6Dh6o2BCEwonBlz',
  access_token_key: '14707789-ZguuH18ZGcJc09RhFTU0UOxQBfhEqcrTbRsPiQd5J',
  access_token_secret: '9wBEAjmjvQIC3nk8E7cdYufgz9PqjedpUvcHLHntQG3jb'
});

//////////////// MozScape

var Mozscape = require('mozscape').Mozscape;
var moz = new Mozscape('mozscape-b81da258f6', '71abbf61298ce7b5feccaeef062132e');

//////////////// Program Start

console.log('  Type Usernames: ');
prompt.start();

prompt.get(['instaID','facebookUserName','twitterUserName','linkToWebsite'], function (err, result) {
    getInstaData(result.instaID);
    getFacebookLikes(result.facebookUserName);
    getTwitterCount(result.twitterUserName);
    getMozScore(result.linkToWebsite);
});

//////////////// Get Insta Data

function getInstaData(userID){
    var url = 'https://api.instagram.com/v1/users/' + userID + '?access_token=5471503.40c44c0.073b7ad5d24a4b85a0c540d75cf736cd';
	https.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var response = JSON.parse(body);
		console.log("Number of Instagram Likes: " + response.data.counts.followed_by);
	}).on('error', function(e){
      console.log("Got an error: ", e);
	});
});
}

//////////////// Get Twitter Data

function getTwitterCount(userID){
    var params = {screen_name: userID};
    client.get('users/show', params, function(error, tweets, response){
    if (!error) {
     console.log("Number of Twitter Followers: " + tweets.followers_count);
  }
});
}

//////////////// Get Moz Score

function getMozScore(link){
    moz.urlMetrics(link, ['domain_authority'], function(err, res) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Moz Score (Out of 100): " + res.pda.toFixed(2));
});
}
//////////////// Get Facebook Data

function getFacebookLikes(name){     
    FB.api(name+'?fields=likes', function (res) {
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  console.log("Number of Facebook Likes: " + res.likes);
});
}
