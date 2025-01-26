document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".cv-section, .cv-entry");

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 50) {
                section.classList.add("visible");
            }
            if (sectionTop > windowHeight - 50) {
                section.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Run on load in case sections are already in view
});
