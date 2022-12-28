const keyboard = document.getElementById('keyboard-sec');
const row1 = [...'\'1234567890-=', 'backspace'];
const row2 = ['tab', ...'qwertyuiop[]', '\\'.length];
const row3 = ['caps', ...'asdfghjkl;:','enter'];
const row4 = ['shift', ...'zxcvbnm,./', 'shift'];
const row5 = ['.com', '@', ''];

const creatKey = (keyText) => {
  const key = document.createElement('div');
  key.innerText = keyText;
  return key;
};

const creatSectionWKeys = (keys) => {
  const sec = document.createElement('section');
  sec.classList.add('row');
  sec.replaceChildren(...keys.map(creatKey));
  return sec;
};

const concatAllRows = (...rows) => rows.map((row) => creatSectionWKeys(row));

keyboard.replaceChildren(...concatAllRows(row1, row2, row3, row4, row5));
