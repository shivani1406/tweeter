/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// import * as timeago from 'timeago.js';
$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for(let tweet in tweets){
    let $tweet = createTweetElement(tweets[tweet]);
    $('#tweet-box').prepend($tweet);
    console.log($tweet);
  }
}

const createTweetElement = function(tweet) {
  // let section = $("<section>").addClass("tweet-container");
  let article = $("<article>").addClass("tweet-article");
  let header = $("<header>").addClass("tweet-header");
  let img = $("<img>").addClass("tweet-image");
  let h2 = $("<h2>").addClass("tweetname");
  let spanOne = $("<span>").addClass("username");
  let p = $("<p>").addClass("tweet-content");
  let footer = $("<footer>").addClass("tweet-footer");
  let spanTwo = $("<span>").addClass("tweet-footer-content");
  let iOne = $("<i>").addClass("fas fa-flag");
  let iTwo = $("<i>").addClass("fas fa-sync");
  let iThree = $("<i>").addClass("fas fa-heart");

  footer.append(iOne);
  footer.append(iTwo);
  footer.append(iThree);
  footer.append(spanTwo);
  header.append(img);
  header.append(h2);
  header.append(spanOne);
  article.append(header);
  article.append(p);
  article.append(footer);
  
  // section.append(article);

   img.attr("src", tweet.user.avatars);
  h2.text(tweet.user.name);
  spanOne.text(tweet.user.handle);
  p.text(tweet.content.text);
  spanTwo.text(timeago.format(tweet.created_at));

  return article;
}

renderTweets(data);

function loadTweets(){
  $.ajax({
    url: '/tweets',
    method: "GET",
    success: data => {
      $("#tweet-box").empty()
      renderTweets(data);
      $("#tweet-text").val("");
    },
    failure: error => {
      console.log(error);
    }
  });
}

let $form = $('#tweet-form');
$("form").on("submit", function(e){
  // prevents form reload
   e.preventDefault();
   let $formData = $form.serialize();
  console.log($formData);

  //form validations
  let input = $('#tweet-text').val().length;
  console.log(input);
  if (input === 0 || input > 140) {
    alert("invalid input ! Please check your tweet");
    return;
  }
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $formData,
    success: data => {
      loadTweets();
      console.log("in this");
    },
    failure: error => {
      console.log(error);
    }
  });
  })
})

