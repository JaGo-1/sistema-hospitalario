const btn_menu = document.getElementById("btn_menu");
const menu = document.getElementById("sidebar");

btn_menu.addEventListener("click", () => {
  menu.classList.toggle("w-0");
  menu.classList.toggle("w-full");
});
