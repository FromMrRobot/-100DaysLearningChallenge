let currentExpression = "";
const display = document.getElementById("view");

function animateDisplay() {
  display.classList.add("active");
  clearTimeout(display.timer);
  display.timer = setTimeout(() => display.classList.remove("active"), 300);
}

function adjustDisplayHeight() {
  display.scrollLeft = display.scrollWidth; // scroll horizontally to the end
}

function clearDisplay() {
  currentExpression = "";
  display.textContent = "0";
  adjustDisplayHeight();
}

function deleteLast() {
  if (currentExpression === "Error") {
    clearDisplay();
    return;
  }
  currentExpression = currentExpression.slice(0, -1);
  display.textContent = currentExpression || "0";
  adjustDisplayHeight();
  animateDisplay();
}

function calculate() {
  try {
    let finalExpression = currentExpression.replace(/%/g, "/100*");
    if (finalExpression === "") {
      display.textContent = "0";
      return;
    }
    let result = eval(finalExpression);
    if (!isFinite(result)) {
      currentExpression = "Error";
      display.textContent = "Error";
      return;
    }
    currentExpression = parseFloat(result.toFixed(10)).toString();
    display.textContent = currentExpression;
  } catch {
    currentExpression = "Error";
    display.textContent = "Error";
  }
  adjustDisplayHeight();
  animateDisplay();
}

function appendValue(value) {
  if (currentExpression === "Error") currentExpression = "";
  if (value === "AC") clearDisplay();
  else if (value === "←") deleteLast();
  else if (value === "=") calculate();
  else {
    currentExpression += value;
    display.textContent = currentExpression;
    adjustDisplayHeight();
    animateDisplay();
  }
}

document.querySelectorAll(".grid-container button").forEach((btn) => {
  btn.addEventListener("click", () => appendValue(btn.dataset.value));
});

clearDisplay();