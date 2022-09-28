import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
refs.btnStart.addEventListener('click', handleStart);

let chosenDate = null;

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

let intervalId = null;

function handleStart() {
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const allTime = chosenDate - currentDate;
    if (allTime <= 0) {
      return clearInterval(intervalId);
    }
    const { days, hours, minutes, seconds } = convertMs(allTime);
    refs.dataDays.textContent = `${addLeadingZero(days)}`;
    refs.dataHours.textContent = `${addLeadingZero(hours)}`;
    refs.dataMinutes.textContent = `${addLeadingZero(minutes)}`;
    refs.dataSeconds.textContent = `${addLeadingZero(seconds)}`;
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    chosenDate = selectedDates[0];

    if (Date.now() > chosenDate) {
      refs.btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};
refs.btnStart.disabled = true;

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
