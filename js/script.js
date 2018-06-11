'use strict';

var countdown = void 0;
var displayTime = document.querySelector('.display__time-left');
var buttons = document.querySelectorAll('[data-time]');
var endTime = document.querySelector('.display__end-time');

function timer(seconds) {
  // Clear an existing countdown timer
  clearInterval(countdown);
  var now = Date.now();
  var then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(function () {
    var secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      document.title = 'Countdown timer ended';
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  var seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function displayTimeLeft(secondsLeft) {
  var hours = Math.floor(secondsLeft / 60 / 60);
  var minutes = Math.floor(secondsLeft / 60) - hours * 60;
  var seconds = secondsLeft % 60;
  var display = '' + (hours > 0 ? hours + ':' : '') + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  displayTime.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  var end = new Date(timestamp);
  var hours = end.getHours();
  var minutes = end.getMinutes();
  endTime.textContent = 'Timer ends at ' + (hours > 12 ? hours - 12 : hours) + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + (hours > 12 ? ' pm' : ' am');
}

buttons.forEach(function (button) {
  return button.addEventListener('click', startTimer);
});
document.customTime.addEventListener('submit', function (e) {
  e.preventDefault();
  var minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
});