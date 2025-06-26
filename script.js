// Hamburger menu active for mobile navigation
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");
  if (hamburger && navbar) {
    hamburger.addEventListener("click", function () {
      navbar.classList.toggle("active");
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Get config from the page
  const config = window.quizConfig || {};
  const correctAnswer = config.correctAnswer || "";
  const nextPage = config.nextPage || "result.html";
  const questionName = config.questionName || "q1";
  const attempted = localStorage.getItem(questionName + "_attempted");
  if (attempted === "1") {
    window.location.href = nextPage;
    return;
  }
  const form = document.getElementById("quiz-form");
  if (!form) return;

  const nextBtn = form.querySelector("#next-btn");
  const radios = form.querySelectorAll(
    `input[type="radio"][name="${questionName}"]`
  );
  const markDiv = document.getElementById("mark");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.setItem(questionName + "_attempted", "1");
    setTimeout(() => (window.location.href = nextPage), 900);
    let selected = "";
    let selectedLabel = null;
    radios.forEach((radio) => {
      if (radio.checked) {
        selected = radio.value;
        selectedLabel = radio.closest(".custom-radio");
      }
    });

    // Get current score or start at 0
    // ...existing code...
    let score = Number(localStorage.getItem("quizScore")) || 0;
    let correct = Number(localStorage.getItem("quizCorrect")) || 0;
    let incorrect = Number(localStorage.getItem("quizIncorrect")) || 0;

    if (selected === correctAnswer) {
      if (selectedLabel) selectedLabel.classList.add("selected-correct");
      nextBtn.style.backgroundColor = "#4caf50";
      nextBtn.style.color = "#fff";
      markDiv.textContent = "+4";
      markDiv.style.color = "#4caf50";
      score += 4;
      correct += 1;
      localStorage.setItem("quizScore", score);
      localStorage.setItem("quizCorrect", correct);
      setTimeout(() => (window.location.href = nextPage), 900);
    } else if (selected) {
      if (selectedLabel) selectedLabel.classList.add("selected-wrong");
      nextBtn.style.backgroundColor = "#e74c3c";
      nextBtn.style.color = "#fff";
      markDiv.textContent = "-1";
      markDiv.style.color = "#e74c3c";
      score -= 1;
      incorrect += 1;
      localStorage.setItem("quizScore", score);
      localStorage.setItem("quizIncorrect", incorrect);
      setTimeout(() => (window.location.href = nextPage), 900);
    } else {
      nextBtn.style.backgroundColor = "#0d2c49";
      nextBtn.style.color = "#fffece";
      markDiv.textContent = "";
    }
  });

  // Reset button color, mark, and label highlight when user changes selection
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      nextBtn.style.backgroundColor = "#0d2c49";
      nextBtn.style.color = "#fffece";
      markDiv.textContent = "";
      document.querySelectorAll(".custom-radio").forEach((label) => {
        label.classList.remove("selected-correct", "selected-wrong");
      });
    });
  });
});
