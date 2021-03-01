/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  $('#min-error').hide();
  $('#max-error').hide();
	
  // Handle submission of new tweet
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    console.log($('#tweet-text').val().length);
    // Handle form errors (no input or too large of input)
    if ($('#tweet-text').val().length === 0) {
      $('#min-error').show();
      $('#max-error').hide();
    } else if ($('#tweet-text').val().length > 140) {
      $('#max-error').show();
      $('#min-error').hide();
    } else {
      // Handle a successful submission
      $.ajax({ method: "POST", url: "/tweets", data: $(this).serialize()})
        .then(function() {
          $('#min-error').hide();
          $('#max-error').hide();
          $('#tweet-text').val('');
          document.getElementsByClassName('counter').counter.innerHTML = 140;
          location.reload();
        });
    }
  });
  $loadTweets();
});

const createTweetElement = (tweet) => {
  // Creates an html article element for the given tweet
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

const $loadTweets = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then(function(tweets) {
      renderTweets(tweets);
    });
};
	
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = (tweets) => {
  // Creates a tweet element for each tweet and adds it to the tweets container
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};