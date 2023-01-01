const keyboard = document.getElementById('keyboard-sec');
const textArea = document.getElementById('text');
const rows = [
  [...'\'1234567890-=', 'backspace'],
  ['tab', ...'qwertyuiop[]', '\\'],
  ['caps', ...'asdfghjkl;:','enter'],
  ['shift', ...'zxcvbnm,./', 'shift'],
  ['.com', '@', ' ']
];

const filterCharKeys = (keys) => Array.from(keys).filter(({ innerText }) => innerText.length <= 1 && innerText !== ' ');

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
  const keys = filterCharKeys(document.getElementsByClassName('key'));

  if (keys[13].value === 'q') for (const key of keys) canUpper(key);
  else lowerChars(keys);
};

const regexMaker = (char) => new RegExp(`${char}$`);

const removeLast = (text) => {
  const splited = text.split('');
  splited[splited.length - 1] = '';
  return splited.join('');
};

const backspace = () => {
  const text = textArea.value;
  const last = text[text.length - 1]
  const reg = regexMaker(last);
  if (last !== '\\') textArea.value = text.replace(reg, '') ;
  else textArea.value = removeLast(text);
};

const addClass = (elemen, clas) => {
  if (elemen.innerText.length <= 1) elemen.classList.add(clas);
};

const removeClass = (el, c) => el.classList.remove(c);

const shift = () => {
  const keys = filterCharKeys(document.getElementsByClassName('key'));
  if (keys[13].innerText === 'q') for (const key of keys) addClass(key, 'shifted');
  else for (const key of keys) removeClass(key, 'shifted');
};

const sKeys = {
  tab: () => textArea.value += '    ',
  enter: () => textArea.value += '\n',
  caps,
  backspace,
  shift,
};

const chooseSpecialKeyFunc = (text) => sKeys[text];

const genericKeyEvent = (event) => textArea.value += event.target.value;

const chooseFunction = (text) => chooseSpecialKeyFunc(text) || genericKeyEvent;

const creatKey = (keyText) => {
  const key = document.createElement('div');
  key.innerText = keyText;
  key.value = keyText;
  key.className = 'btn btn-dark key';
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

keyboard.replaceChildren(...concatAllRows(...rows));
