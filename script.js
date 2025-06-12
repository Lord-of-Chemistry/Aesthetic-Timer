      let centiseconds = 0,
        seconds = 0,
        minutes = 0;
      let interval;
      let isRunning = false;

      const minuteEl = document.getElementById("minutes");
      const secondEl = document.getElementById("seconds");
      const centiEl = document.getElementById("centiseconds");

      const startBtn = document.querySelector(".start");
      const stopBtn = document.querySelector(".stop");
      const pauseBtn = document.querySelector(".pause");
      const resetBtn = document.querySelector(".reset");
      const lapBtn = document.querySelector(".lap");
      const clearBtn = document.querySelector(".clear");
      const lapsDiv = document.getElementById("laps");

      function updateDisplay() {
        minuteEl.textContent = minutes.toString().padStart(2, "0");
        secondEl.textContent = seconds.toString().padStart(2, "0");
        centiEl.textContent = centiseconds.toString().padStart(2, "0");
      }

      function startTimer() {
        if (isRunning) return;
        isRunning = true;
        interval = setInterval(() => {
          centiseconds++;
          if (centiseconds >= 100) {
            centiseconds = 0;
            seconds++;
          }
          if (seconds >= 60) {
            seconds = 0;
            minutes++;
          }
          updateDisplay();
        }, 10);
      }

      function stopTimer() {
        clearInterval(interval);
        isRunning = false;
      }

      function resetTimer() {
        stopTimer();
        centiseconds = 0;
        seconds = 0;
        minutes = 0;
        updateDisplay();
      }

      function pauseTimer() {
        stopTimer();
      }

      function lapTimer() {
        const lap = document.createElement("p");
        lap.textContent = `Lap: ${minutes.toString().padStart(2, "0")} : ${seconds
          .toString()
          .padStart(2, "0")} : ${centiseconds.toString().padStart(2, "0")}`;
        lapsDiv.appendChild(lap);
      }

      function clearLaps() {
        lapsDiv.innerHTML = "";
      }

      // Event Listeners
      startBtn.addEventListener("click", startTimer);
      stopBtn.addEventListener("click", stopTimer);
      pauseBtn.addEventListener("click", pauseTimer);
      resetBtn.addEventListener("click", resetTimer);
      lapBtn.addEventListener("click", lapTimer);
      clearBtn.addEventListener("click", clearLaps);