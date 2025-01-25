const toggleBtn = document.getElementById("toggleBtn");
const navItems = document.querySelector(".nav-items");

toggleBtn.addEventListener("click", () => {
    navItems.classList.toggle("active");
})