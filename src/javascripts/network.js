const image = new Image();
let tStart = null;
let tEnd = null;
let abortFallback = false;
let counter = 0;
let arrTimes = [];

checkConnectivity({});

function checkConnectivity({ url = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', timeToCount = 3, threshold = 3000, interval = 10000 }) {
  reset();
  if (navigator.onLine) {
    changeConnectivity(true);
  } else {
    timeoutFallback(threshold);
  }

  window.addEventListener('online', () => changeConnectivity(true));
  window.addEventListener('offline', () => timeoutFallback(threshold));

  timeoutFallback(threshold);
  checkLatencty(url, timeToCount, threshold, avg => handleLatency(avg, threshold));
  setInterval(() => {
    reset();
    timeoutFallback(threshold);
    checkLatencty(url, timeToCount, threshold, avg => handleLatency(avg, threshold));
  }, interval);
}

function checkLatencty(url, timeToCount, threshold, cb) {
  tStart = Date.now();
  if (counter < timeToCount) {
    image.src = `${url}?t=${tStart}`;
    image.onload = function () {
      abortFallback = true;
      tEnd = Date.now();
      const time = tEnd - tStart;
      arrTimes.push(time);
      counter++;
      checkLatencty(url, timeToCount, threshold, cb);
    };
    image.onerror = function () {
      abortFallback = false;
    };
  } else {
    const sum = arrTimes.reduce((a, b) => a + b);
    const avg = sum / arrTimes.length;
    cb(avg);
  }
}

function handleLatency(avg, threshold) {
  const isConnectedFast = avg <= threshold;
  changeConnectivity(isConnectedFast);
}

function changeConnectivity(state) {
  const event = new CustomEvent('connection-changed', {
    detail: state
  });
  document.dispatchEvent(event);
}

function timeoutFallback(threshold) {
  setTimeout(() => {
    if (document.getElementById('status-indicator')) {
      document.querySelector('#status-indicator > span').textContent = abortFallback ? 'En ligne' : 'Hors ligne';
      document.querySelector('#status-indicator > svg > circle').setAttribute('fill', abortFallback ? '#2f855a' : '#c53030');
    }
    if (!abortFallback) {
      changeConnectivity(false);
    }
  }, threshold + 1);
}

function reset() {
  arrTimes = [];
  counter = 0;
  abortFallback = false;
}