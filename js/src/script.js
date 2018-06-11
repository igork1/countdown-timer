let countdown;
const displayTime = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('[data-time]');
const endTime = document.querySelector('.display__end-time');

function timer(seconds) {
  // Clear an existing countdown timer
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      document.title = 'Countdown timer ended';
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function displayTimeLeft(secondsLeft) {
  const hours = Math.floor(secondsLeft / 60 / 60);
  const minutes = Math.floor(secondsLeft / 60) - (hours * 60);
  const seconds = secondsLeft % 60;
  const display = `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  displayTime.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Timer ends at ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes} ${hours > 12 ? ' pm' : ' am'}`;
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customTime.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
});
