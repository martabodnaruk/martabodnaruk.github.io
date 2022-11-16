const openIcon = document.getElementById("openIcon");
const closeIcon = document.getElementById("closeIcon");
const mobileMenu = document.getElementById("mobileMenu");
const langUaD = document.getElementById("lang-ua-d");
const langEngD = document.getElementById("lang-eng-d");
const langUaM = document.getElementById("lang-ua-m");
const langEngM = document.getElementById("lang-eng-m");

document.addEventListener("DOMContentLoaded", () => {
  openIcon.addEventListener("click", () => {
    mobileMenu.classList.add("show");
  });

  closeIcon.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });

  langUaD.addEventListener("click", () => {
    langUaD.classList.add("active");
    langEngD.classList.remove("active");
  });

  langEngD.addEventListener("click", () => {
    langEngD.classList.add("active");
    langUaD.classList.remove("active");
  });
  langEngM.addEventListener("click", () => {
    langEngM.classList.add("active");
    langUaM.classList.remove("active");
  });
  langUaM.addEventListener("click", () => {
    langUaM.classList.add("active");
    langEngM.classList.remove("active");
  });
});
