//configuração: elemento (script com "defer")
const display = document.getElementById('display');

// Funções da calculadora

function addChar(char) {
  if (!display) return;
  if (display.value === '0') display.value = String(char);
  else display.value += String(char);
}

// Limpar display
function clearDisplay() {
  display.value = '0';
}

// Apagar último caractere
function deleteChar() {
  display.value = display.value.slice(0, -1) || '0';
}

// Alterna sinal
function changeSign() {
  if (display.value === '0') return;
  display.value = display.value.startsWith('-') ? display.value.slice(1) : '-' + display.value;
}

function percent() {
  const v = evaluateCurrentValue();
  if (isNaN(v)) { display.value = 'Erro'; return; }
  display.value = String(v / 100);
}

function evaluateCurrentValue() {
  try {
    let expr = String(display.value).replace(/÷/g, '/').replace(/×/g, '*');
    if (!/^[0-9+\-*/().\s%]*$/.test(expr)) return NaN;
    const result = new Function('return ' + expr)();
    return Number(result);
  } catch {
    return NaN;
  }
}

//  (botão '=')
function compute() {
  const val = evaluateCurrentValue();
  if (!isFinite(val)) {
    display.value = 'Erro';
  } else {
    display.value = String(Number((+val).toPrecision(12)));
  }
}

// util: graus -> radianos
function toRadians(v) {
  return (Number(v) * Math.PI) / 180;
}

// Funções unárias
function applySin() {
  const v = evaluateCurrentValue();
  if (isNaN(v)) { display.value = 'Erro'; return; }
  display.value = String(Math.sin(toRadians(v)));
}
function applyCos() {
  const v = evaluateCurrentValue();
  if (isNaN(v)) { display.value = 'Erro'; return; }
  display.value = String(Math.cos(toRadians(v)));
}
function applyTan() {
  const v = evaluateCurrentValue();
  if (isNaN(v)) { display.value = 'Erro'; return; }
  display.value = String(Math.tan(toRadians(v)));
}
function applySqrt() {
  const v = evaluateCurrentValue();
  if (isNaN(v) || v < 0) { display.value = 'Erro'; return; }
  display.value = String(Math.sqrt(v));
}
function applyLn() {
  const v = evaluateCurrentValue();
  if (isNaN(v) || v <= 0) { display.value = 'Erro'; return; }
  display.value = String(Math.log(v));
}
function applySquare() {
  const v = evaluateCurrentValue();
  if (isNaN(v)) { display.value = 'Erro'; return; }
  display.value = String(v * v);
}

// Toggle Modo Claro/Escuro 
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    // Modo claro
    document.documentElement.style.setProperty('--bg-body', '#f0f0f0');
    document.documentElement.style.setProperty('--bg-calc', '#ffffff');
    document.documentElement.style.setProperty('--display-bg', '#e6e6e6');
    document.documentElement.style.setProperty('--display-color', '#000000');
    document.documentElement.style.setProperty('--btn-num-bg', '#d9d9d9');
    document.documentElement.style.setProperty('--btn-num-color', '#000000');
    document.documentElement.style.setProperty('--btn-math-bg', '#3399ff');
    document.documentElement.style.setProperty('--btn-math-color', '#ffffff');
    document.documentElement.style.setProperty('--btn-opps-bg', '#ffb347');
    document.documentElement.style.setProperty('--btn-opps-color', '#000000');
    document.documentElement.style.setProperty('--btn-top-bg', '#ff4d4d');
    document.documentElement.style.setProperty('--btn-top-color', '#ffffff');
  } else {
    // Modo escuro
    document.documentElement.style.setProperty('--bg-body', '#121212');
    document.documentElement.style.setProperty('--bg-calc', '#1c1c1c');
    document.documentElement.style.setProperty('--display-bg', '#000000');
    document.documentElement.style.setProperty('--display-color', '#00ff9d');
    document.documentElement.style.setProperty('--btn-num-bg', '#2d2d2d');
    document.documentElement.style.setProperty('--btn-num-color', '#ffffff');
    document.documentElement.style.setProperty('--btn-math-bg', '#007bff');
    document.documentElement.style.setProperty('--btn-math-color', '#ffffff');
    document.documentElement.style.setProperty('--btn-opps-bg', '#ff8a16');
    document.documentElement.style.setProperty('--btn-opps-color', '#ffffff');
    document.documentElement.style.setProperty('--btn-top-bg', '#dc3545');
    document.documentElement.style.setProperty('--btn-top-color', '#ffffff');
  }
});

