const keyboard = document.getElementById('keyboard-sec');
const keys = '1234567890qwertyuiopasdfghjklçzxcvbnm,.?'.split('');

const creatKey = (keyText) => {
  const key = document.createElement('div');
  key.innerText = keyText;
  return key;
};

keyboard.replaceChildren(...keys.map(creatKey));
