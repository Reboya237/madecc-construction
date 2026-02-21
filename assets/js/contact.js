/* =====================
   SCROLL REVEAL OBSERVER
===================== */
const revealItems = document.querySelectorAll(".reveal");

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

revealItems.forEach(el => revealObserver.observe(el));



/* =====================
   CONTACT FORM + EMAILJS
===================== */

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const modal = document.getElementById("successModal");
const closeBtn = document.getElementById("closeModal");

if (!form) {
    console.error("Contact form not found");
}

/* Submit handler */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* Honeypot check */
    const honeypot = form.querySelector("input[name='company']");
    if (honeypot && honeypot.value !== "") {
        return; // bot detected
    }

    status.textContent = "Sending...";
    status.style.color = "#555";

    emailjs.sendForm(
        "service_f6sicc7",
        "template_uw37ta7",
        form
    )
    .then(() => {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";

        form.reset();
        modal.classList.add("show"); // show modal ONLY on success
    })
    .catch((error) => {
        status.textContent = "Failed to send message. Please try again.";
        status.style.color = "red";
        console.error("EmailJS Error:", error);
    });
});

/* Close modal */
closeBtn?.addEventListener("click", () => {
    modal.classList.remove("show");
});


/* =====================
   FORM VALIDATION
===================== */
function validateForm() {
    let valid = true;

    ["name", "email", "message"].forEach(id => {
        const field = document.getElementById(id);
        field.classList.remove("error");

        if (!field.value.trim()) {
            field.classList.add("error");
            valid = false;
        }
    });

    const email = document.getElementById("email");
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        email.classList.add("error");
        valid = false;
    }

    return valid;
}


/* =====================
   ANALYTICS EVENTS
===================== */
function trackEvent(name, params = {}) {
    if (typeof gtag === "function") {
        gtag("event", name, params);
    }
}

/* Track form submission */
function showSuccessModal() {
    document.getElementById("successModal").classList.add("show");

    trackEvent("contact_form_submitted", {
        event_category: "engagement",
        event_label: "Contact Page"
    });
}

/* Track WhatsApp click */
document.querySelector(".whatsapp-float")?.addEventListener("click", () => {
    trackEvent("whatsapp_click", {
        event_category: "conversion"
    });
});
