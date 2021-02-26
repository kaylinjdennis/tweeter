/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  $('#form-error').hide();
  const $loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    $('#form-error').hide();
    $('#min-error').hide();
    $('#max-error').hide();
    const counter = document.getElementsByClassName('counter').counter.innerHTML;
    if ($(this).serialize().length === 5) {
      $('#form-error').show();
      $('#min-error').show();
    } else if (counter < 0) {
      $('#form-error').show();
      $('#max-error').show();
    } else {
      $.ajax({ method: "POST", url: "/tweets", data: $(this).serialize()})
        .done(function() {
          $('#tweet-text').val('');
          document.getElementsByClassName('counter').counter.innerHTML = 140;
          $loadTweets();
        });
    }
  });
  $loadTweets();
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
				<span>${escape(tweet.content.text)}</span>
			</div>
			<footer>
				<p>${(Math.floor((Date.now() - tweet.created_at) / 86400000))} days ago</p>
			</footer>
			</article>
	`);
  return $tweet;
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = (tweets) => {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const numOfInitialTweets = $('#tweets-container').children.length;
  if (tweets.length > numOfInitialTweets) {
    const $tweet = createTweetElement(tweets[tweets.length - 1]);
    $('#tweets-container').append($tweet);
  } else {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }
};