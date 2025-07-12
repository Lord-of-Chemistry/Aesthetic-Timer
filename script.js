window.addEventListener("load", () => {
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeOverlay");

  setTimeout(() => {
    overlay.classList.add("show-overlay");
  }, 500);

  closeBtn.addEventListener("click", () => {
    overlay.style.top = "-100%";
  });
});

let centiseconds = 0,
  seconds = 0,
  minutes = 0;
let intervalId = null;
let isRunning = false;

// Time display
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const centiEl = document.getElementById("centiseconds");
const lapsDiv = document.getElementById("laps");

// Buttons (grab <button> not <span>)
const startPauseBtn = document.querySelector(".button .start").parentElement;
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
function formatTime(val) {
  return val.toString().padStart(2, "0");
}

function updateDisplay() {
  if (minuteEl.textContent !== formatTime(minutes)) {
    minuteEl.textContent = formatTime(minutes);
    pulseElement(minuteEl);
  }

  if (secondEl.textContent !== formatTime(seconds)) {
    secondEl.textContent = formatTime(seconds);
    pulseElement(secondEl);
  }

  if (centiEl.textContent !== formatTime(centiseconds)) {
    centiEl.textContent = formatTime(centiseconds);
    pulseElement(centiEl);
  }
}

function pulseElement(el) {
  el.classList.remove("pulse");
  void el.offsetWidth;
  el.classList.add("pulse");
}

function startTimer() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    centiseconds++;
    if (centiseconds === 100) {
      centiseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 10);
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  pauseTimer();
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  updateDisplay();

  // Reset button text
  startPauseBtn.querySelector(".start").textContent = "Start";
  isRunning = false;
}

function lapTimer() {
  const lapTime = `Lap: ${formatTime(minutes)} : ${formatTime(seconds)} : ${formatTime(centiseconds)}`;
  const lap = document.createElement("p");
  lap.textContent = lapTime;
  lapsDiv.appendChild(lap);
}

function clearLaps() {
  lapsDiv.innerHTML = "";
}

// === Event Listeners ===
startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startPauseBtn.querySelector(".start").textContent = "Pause";
  } else {
    pauseTimer();
    startPauseBtn.querySelector(".start").textContent = "Start";
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  clearLaps();
});

lapBtn.addEventListener("click", lapTimer);

// === Theme Functions ===

function getBrightness(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function updateButtonTextColor(bgHex) {
  const brightness = getBrightness(bgHex);
  const textColor = brightness < 128 ? "#fff" : "#000";

  document.querySelectorAll(".button").forEach(btn => {
    btn.style.color = textColor;
  });

  document.querySelectorAll(".timer-display span").forEach(span => {
    span.style.color = textColor;
  });
}

const root = document.documentElement;
let colorStep = 0;
const colorSets = [
  { primary: "#4e54c8", accent: "#8f94fb" },
  { primary: "#1f4037", accent: "#99f2c8" },
  { primary: "#b84300", accent: "#ff6a00" },
  { primary: "#1e1e2f", accent: "#064db8" },
];

setInterval(() => {
  const next = colorSets[colorStep % colorSets.length];
  root.style.setProperty("--primary-color", next.primary);
  root.style.setProperty("--accent-color", next.accent);
  updateButtonTextColor(next.primary);
  colorStep++;
}, 6000);
