import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onCheckDate(selectedDates);
  },
};

const dateInput = document.querySelector('input#datetime-picker');
const btnStartRef = document.querySelector('button[data-start]');
const daysRemainingRef = document.querySelector('[data-days]');
const hoursRemainingRef = document.querySelector('[data-hours]');
const minutesRemainingRef = document.querySelector('[data-minutes]');
const secondsRemainingRef = document.querySelector('[data-seconds]');
btnStartRef.disabled = true;
btnStartRef.addEventListener('click', onClickBtnStartTimer);
let selectedDate = null;
let currentDate = null;
flatpickr(dateInput, options);

let remainingTime = 0;

function onCheckDate(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = options.defaultDate.getTime();
  if (selectedDate > currentDate) {
    btnStartRef.disabled = false;
    return;
  }
  Notify.info('Please choose a date in the future');
}

function onClickBtnStartTimer() {
  let idTimer = setInterval(() => {
    if (selectedDate - currentDate < 999) {
      clearInterval(idTimer);
      return;
    } else {
      btnStartRef.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);

      convertMs(remainingTime);
    }
  }, 1000);
}

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function createMarkup({ days, hours, minutes, seconds }) {
  daysRemainingRef.textContent = days;
  hoursRemainingRef.textContent = hours;
  minutesRemainingRef.textContent = minutes;
  secondsRemainingRef.textContent = seconds;
}
