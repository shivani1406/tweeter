/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Focuses the curson to the teaxtarea
  $("#tweet-text").focus();
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
  }
]
// Iterate on the tweets and adds to the section 
const renderTweets = function(tweets) {
  for(let tweet in tweets){
    let $tweet = createTweetElement(tweets[tweet]);
    $('#tweet-box').prepend($tweet);
  }
}

// Creates tweet components to be added to the dynamic section 
const createTweetElement = function(tweet) {
 
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

  img.attr("src", tweet.user.avatars);
  h2.text(tweet.user.name);
  spanOne.text(tweet.user.handle);
  p.text(tweet.content.text);
  spanTwo.text(timeago.format(tweet.created_at));

  return article;
}

renderTweets(data);

function getTweets(){
  // AJAX code to get data
  $.ajax({
    url: '/tweets',
    method: "GET",
    success: data => {
      $("#tweet-box").empty()
      renderTweets(data);
      $("#tweet-text").val("");
      $("#errormessage").text("");
      $("#counter").val("140");
      $('#errormessage').css({"border": "0px"});
    },
    failure: error => {
      console.log(error);
    }
  });
}
// Submits the form on pressing enter key 
let $form = $('#tweet-form');
$('form').keypress((e) => {
  if (e.which === 13) {
      $('form').submit();
  }
})
// Form submit logic
$("form").on("submit", function(e){
  // prevents form reload
   e.preventDefault();
   let $formData = $form.serialize();

  //form validations
  let input = $('#tweet-text').val().length;
  console.log(input);
  if (input === 0 ) {
    $('#errormessage').text("You did not write anything in your tweet ! Please check your tweet");
    $('#errormessage').css({"border": "2px solid red"});
    return;
  } else if(input > 140) {
    $('#errormessage').text("You cannot type beyond the character limits ! Please check your tweet");
    $('#errormessage').css({"border": "2px solid red"});
    return;
  }
  //AJAX code to post Data
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $formData,
    success: data => {
      getTweets();
      console.log("in this");
    },
    failure: error => {
      console.log(error);
    }
  });
  })
})

