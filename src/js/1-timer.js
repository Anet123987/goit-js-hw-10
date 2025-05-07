// бібліотекb
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
flatpickr("#datetime-picker", {
    enableTime: true,        
    dateFormat: "Y-m-d H:i", 
    minDate: "today",        
    time_24hr: true,        
  });
  
  
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// елементи 
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');

let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};



// Обробка кнопки Start
startBtn.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      return;
    }

    updateTimer(diff);
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

 
  
function convertMs(ms) {
  const second = 1000;
  const minute=second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
  
let d = days;
let h = hours;
let m = minutes;
let s = seconds;

if (d < 10) d = '0' + d;
if (h < 10) h = '0' + h;
if (m < 10) m = '0' + m;
if (s < 10) s = '0' + s;

daysEl.textContent = d;
hoursEl.textContent = h;
minutesEl.textContent = m;
secondsEl.textContent = s;
