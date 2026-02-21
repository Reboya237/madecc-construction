/* =====================
   MOBILE MENU
===================== */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

/* Close on outside click */
document.addEventListener("click", e => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
    }
});

/* =====================
   STICKY SHRINK NAV
===================== */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

/* =====================
   ROLE BASED MENU
===================== */
/*
  Possible roles:
  "guest"
  "client"
  "admin"
*/
const userRole = localStorage.getItem("userRole") || "guest";

if (userRole === "client") {
    document.querySelectorAll(".client-only").forEach(el => el.style.display = "block");
}

if (userRole === "admin") {
    document.querySelectorAll(".admin-only").forEach(el => el.style.display = "block");
}

/* =====================
   DARK MODE
===================== */
const darkToggle = document.getElementById("darkToggle");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️";
}

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const enabled = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
    darkToggle.textContent = enabled ? "☀️" : "🌙";
});

/* =====================
   SCROLL ANIMATIONS
===================== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".project, .service").forEach(el => observer.observe(el));

/* =====================
   PAGE PRELOADING
===================== */
document.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("mouseenter", () => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("#")) {
            const prefetch = document.createElement("link");
            prefetch.rel = "prefetch";
            prefetch.href = href;
            document.head.appendChild(prefetch);
        }
    });
});

/* =====================
   MOBILE SERVICES TOGGLE
===================== */
const servicesLink = document.querySelector(".services-link");
const mobileDropdown = document.querySelector(".mobile-dropdown");

servicesLink.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        mobileDropdown.classList.toggle("open");
    }
});
