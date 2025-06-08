const checkboxGuardia = document.getElementById("proveniente_guardia");
const camposDeshabilitables = [
  "tipo_ingreso",
  "nombre",
  "apellido",
  "dni",
  "edad",
  "direccion",
  "telefono",
  "telefono_emergencia",
];

function actualizarCampos() {
  const desactivar = checkboxGuardia.checked;

  camposDeshabilitables.forEach((n) => {
    const campo = document.getElementsByName(n)[0];
    if (campo) {
      campo.disabled = desactivar;
    }
  });

  const tipoIngreso = document.getElementsByName("tipo_ingreso")[0];
  if (checkboxGuardia.checked && tipoIngreso) {
    tipoIngreso.value = "Emergencia";
  }
}

checkboxGuardia.addEventListener("change", actualizarCampos);
window.addEventListener("DOMContentLoaded", actualizarCampos);
