const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const buttonsWithPulse = document.querySelectorAll(".pulse-on-click, .map-link");
const timelineCards = document.querySelectorAll(".timeline-card");
const revealItems = document.querySelectorAll(".reveal");
const downloadPlan = document.querySelector("#downloadPlan");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a, .hero-actions a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    event.preventDefault();
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

timelineCards.forEach((card, index) => {
  const head = card.querySelector(".timeline-head");

  if (index === 0) {
    card.classList.add("active");
  }

  head.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

buttonsWithPulse.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.remove("clicked");
    void button.offsetWidth;
    button.classList.add("clicked");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

downloadPlan.addEventListener("click", () => {
  const planText = `2-Day Budget Trip to Mussoorie

Route: Delhi -> Dehradun -> Mussoorie
Budget: Rs 2500-Rs 3000 per person

Day 0:
11:00 PM - Reach Kashmiri Gate Bus Stand
11:30 PM - Board govt bus to Dehradun

Day 1:
6:00 AM - Reach Dehradun ISBT
6:30 AM - Shared taxi to Mussoorie
8:00 AM - Hotel check-in
10:00 AM - Explore Mall Road
2:00 PM - Visit Kempty Falls
7:00 PM - Night walk + street food

Day 2:
5:30 AM - Sunrise at Gun Hill
9:00 AM - Breakfast
12:00 PM - Checkout
1:00 PM - Return to Dehradun
4:00 PM - Bus to Delhi`;

  const blob = new Blob([planText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "mussoorie-2-day-budget-plan.txt";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
});
