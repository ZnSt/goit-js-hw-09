import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubForm);

function onSubForm(event) {
  event.preventDefault();
  const inputRefs = event.currentTarget.elements;
  const delayValue = inputRefs.delay.value;
  const stepValue = inputRefs.step.value;
  const amountValue = inputRefs.amount.value;

  let totalDelay = Number(delayValue);

  for (let i = 1; i <= Number(amountValue); i += 1) {
    if (i !== 1) {
      totalDelay += Number(stepValue);
    }
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
