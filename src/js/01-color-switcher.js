function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.body,
};

refs.btnStart.addEventListener('click', onHanldeBtnStart);
refs.btnStop.addEventListener('click', onHanldeBtnStop);

function onHanldeBtnStart() {
  refs.btnStart.setAttribute('disabled', false);
  intervalTime = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
  }, 1000);
}

function onHanldeBtnStop() {
  refs.btnStart.removeAttribute('disabled');
  clearInterval(intervalTime);
}
