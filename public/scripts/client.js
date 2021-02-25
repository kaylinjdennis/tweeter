/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  renderTweets(data);
});


const createTweetElement = (tweet) => {
  const $tweet = $(`
		<article class="tweet">
			<header>
				<div>
					<img src="${tweet.user.avatars}">
					<span>${tweet.user.name}</span>
				</div>
				<span>${tweet.user.handle}</span>
			</header>
			<div class="tweet-body">
				<span>${tweet.content.text}</span>
			</div>
			<footer>
				<p>${(Math.floor((Date.now() - tweet.created_at) / 86400000))} days ago</p>
			</footer>
			</article>
	`);
  return $tweet;
};

const renderTweets = (tweets) => {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

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
];