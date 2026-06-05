window.addEventListener("scroll", function(){

  const navbar = document.querySelector(".navbar");

  if(window.scrollY > 50){

    navbar.classList.add("navbar-scrolled");

  } else {

    navbar.classList.remove("navbar-scrolled");
  }

});

const moviesBtn = document.getElementById("moviesBtn");
const producedBtn = document.getElementById("producedBtn");

const moviesSection = document.getElementById("moviesSection");
const producedSection = document.getElementById("producedSection");

if (moviesBtn && producedBtn) {

moviesBtn.addEventListener("click", () => {

moviesSection.style.display = "grid";
producedSection.style.display = "none";

moviesBtn.classList.add("active-tab");
producedBtn.classList.remove("active-tab");

});

producedBtn.addEventListener("click", () => {

moviesSection.style.display = "none";
producedSection.style.display = "grid";

producedBtn.classList.add("active-tab");
moviesBtn.classList.remove("active-tab");

});

}