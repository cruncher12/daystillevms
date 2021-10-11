const maxValue = {
  hour: 23,
  minute: 59,
  second: 59,
};

const getNext = (unit, value) => !value ? maxValue[unit] : value - 1;

let days = 14;
let hours = 0;
let minutes = 0;
let seconds = 0;

const daysCard = document.querySelector('#days');
const hoursCard = document.querySelector('#hours');
const minutesCard = document.querySelector('#minutes');
const secondsCard = document.querySelector('#seconds');

daysCard.init(days);
hoursCard.init(hours);
minutesCard.init(minutes);
secondsCard.init(seconds);

setInterval(() => {
  seconds = getNext('second', seconds);
  secondsCard.flip(seconds);

  if (seconds == 59) {
    minutes = getNext('minute', minutes);
    minutesCard.flip(minutes);

    if (minutes == 59) {
      hours = getNext('hour', hours);
      hoursCard.flip(hours);

      if (hours == 23) {
        days--;
        daysCard.flip(days);
      }
    }
  }
}, 1000);
