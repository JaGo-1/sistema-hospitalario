document.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll("[data-alert]");

  alerts.forEach((alert) => {
    const closeBtn = alert.querySelector(".close-btn");
    const timerBar = alert.querySelector(".timer-bar");

    timerBar.style.width = "100%";
    timerBar.style.transition = "width 5s linear";

    requestAnimationFrame(() => {
      timerBar.style.width = "0%";
    });

    const timeout = setTimeout(() => {
      alert.remove();
    }, 5000);

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        clearTimeout(timeout);
        alert.remove();
      });
    }
  });
});
