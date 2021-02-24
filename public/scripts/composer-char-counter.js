$(document).ready(function() {
  const element = document.getElementById('tweet-text');
  const counter = document.getElementsByClassName('counter').counter;
  element.addEventListener('input', function() {
    counter.innerHTML = 140 - $(this).val().length;
    if (counter.innerHTML < 0) {
      counter.classList.add('negative');
    } else {
      counter.classList.remove('negative');
    }
  });
});