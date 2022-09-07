btnStartRef = document.querySelector('[data-start]');
btnStopRef = document.querySelector('[data-stop]');

btnStartRef.addEventListener('click', onClickBtnStart);
btnStopRef.addEventListener('click', onClickBtnStop);

let idInt = null;

function onClickBtnStart() {
  btnStartRef.disabled = true;
  idInt = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickBtnStop() {
  btnStartRef.disabled = false;
  clearInterval(idInt);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
