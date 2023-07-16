import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerID = null;
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates < Date.now()) {
      Notify.info('Please choose a date in the future');
      return;
    }
    refs.button.disabled = false;
    selectedDate = selectedDates;
  },
};

const flatpicr = flatpickr('#datetime-picker', options);

export const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  secondsUi: document.querySelector('[data-seconds]'),
  minutesUi: document.querySelector('[data-minutes]'),
  hoursUi: document.querySelector('[data-hours]'),
  daysUi: document.querySelector('[data-days]'),
};

refs.button.addEventListener('click', startTimer);

function startTimer(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  timerID = setInterval(countDownTimer, 1000);
  refs.button.disabled = true;
  refs.input.disabled = true;
}

function countDownTimer() {
  userDate = Date.parse(refs.input.value);
  const diff = userDate - Date.now();
  let { days, hours, minutes, seconds } = getTimeComponents(diff);
  if (userDate <= Date.now()) {
    Notify.info('Please, choose date in the future');
    clearInterval(timerID);
    refs.input.disabled = false;
  }
  if (diff <= 1000) {
    clearInterval(timerID);
    seconds = getTimeComponents(0).seconds;
    minutes = getTimeComponents(0).minutes;
    hours = getTimeComponents(0).hours;
    days = getTimeComponents(0).days;
    refs.input.disabled = false;
  }
  updateCountDownUI({ seconds, minutes, hours, days });
}

function getTimeComponents(time) {
  return convertMs(time);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCountDownUI({ seconds, minutes, hours, days }) {
  refs.secondsUi.textContent = seconds;
  refs.minutesUi.textContent = minutes;
  refs.hoursUi.textContent = hours;
  refs.daysUi.textContent = days;
}
