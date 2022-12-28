const keyboard = document.getElementById('keyboard-sec');
const textArea = document.getElementById('text');
const row1 = [...'\'1234567890-=', 'backspace'];
const row2 = ['tab', ...'qwertyuiop[]', '\\'];
const row3 = ['caps', ...'asdfghjkl;:','enter'];
const row4 = ['shift', ...'zxcvbnm,./', 'shift'];
const row5 = ['.com', '@', ' '];

const upperChar = (key) => {
  key.innerText = key.innerText.toUpperCase();
  key.value = key.value.toUpperCase();
};

const lowerChars = (keys) => {
  for (const key of keys) {
    key.innerText = key.innerText.toLowerCase();
    key.value = key.value.toLowerCase();
  }
};

const canUpper = (key) => {
  if (key.value.length <= 1) upperChar(key);
};

const caps = () => {
  const keys = document.querySelectorAll('.row div');
  if (keys[15].value === 'q') {
    for (const key of keys) {
      canUpper(key);
    }
  } else {
    lowerChars(keys);
  }
};

const sKeys = {
  tab: () => textArea.value += '    ',
  caps,
};

const chooseSpecialKeyFunc = (text) => {
  return sKeys[text];
};

const genericKeyEvent = (event) => textArea.value += event.target.value;

const chooseFunction = (text) => chooseSpecialKeyFunc(text) || genericKeyEvent;

const creatKey = (keyText) => {
  const key = document.createElement('div');
  key.innerText = keyText;
  key.value = keyText;
  key.addEventListener('click', chooseFunction(keyText));
  return key;
};

const creatSectionWKeys = (keys) => {
  const sec = document.createElement('section');
  sec.classList.add('row');
  sec.replaceChildren(...keys.map(creatKey));
  return sec;
};

const concatAllRows = (...rows) => rows.map(creatSectionWKeys);

keyboard.replaceChildren(...concatAllRows(row1, row2, row3, row4, row5));
