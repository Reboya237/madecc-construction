/* =====================
   SCROLL REVEAL
===================== */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.15 }
);

reveals.forEach(el => revealObserver.observe(el));

/* =====================
   COUNTER ANIMATION
===================== */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;
        let current = 0;

        const update = () => {
            const increment = Math.ceil(target / 100);
            current += increment;
            counter.textContent = current >= target ? target : current;
            if (current < target) requestAnimationFrame(update);
        };

        update();
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* =====================
   DARK / LIGHT MODE
===================== */
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}
