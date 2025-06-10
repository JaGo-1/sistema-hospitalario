document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const form = document.getElementById("modal-form");
  const title = document.getElementById("modal-title");
  const message = document.getElementById("modal-message");
  const cancelBtn = document.getElementById("modal-cancel");

  document.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      const id = btn.getAttribute("data-id");
      const nombre = btn.getAttribute("data-nombre");

      title.textContent =
        action === "cancelar"
          ? "¿Cancelar esta admisión?"
          : "¿Dar de alta a este paciente?";

      message.textContent = `Paciente: ${nombre}`;

      form.setAttribute("action", `/admisiones/${action}/${id}`);

      modal.classList.remove("hidden");
    });
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    form.setAttribute("action", "");
  });
});
