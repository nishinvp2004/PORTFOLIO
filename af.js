const menuToggle = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelectorAll(".navigation a");
const scrollDial = document.querySelector(".scroll-dial");
const dialCount = document.querySelector(".dial-count");
const heroIndex = document.querySelector(".hero-index span");
const sections = Array.from(document.querySelectorAll("main > section"));

function setMenuOpen(isOpen) {
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuOpen(false);
    }
});

function updateScrollDial() {
    const marker = window.scrollY + window.innerHeight * 0.45;
    let activeIndex = 0;

    sections.forEach((section, index) => {
        if (section.offsetTop <= marker) {
            activeIndex = index;
        }
    });

    const nextSection = sections[activeIndex + 1] || sections[0];
    scrollDial.href = `#${nextSection.id}`;
    scrollDial.setAttribute(
        "aria-label",
        activeIndex === sections.length - 1
            ? "Return to the top"
            : `Scroll to ${nextSection.id === "home" ? "the top" : nextSection.id}`
    );
    dialCount.textContent = String(activeIndex).padStart(2, "0");

    if (heroIndex) {
        heroIndex.textContent = String(activeIndex).padStart(2, "0");
    }
}

window.addEventListener("scroll", updateScrollDial, { passive: true });
window.addEventListener("resize", updateScrollDial);
updateScrollDial();