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
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
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
