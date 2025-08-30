// Theme Toggle Functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const themeIcon = document.getElementById("theme-icon");
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
  localStorage.setItem("theme", theme);
}

// Customize Sidebar Toggle
function toggleCustomize() {
  const sidebar = document.getElementById("customizeSidebar");
  sidebar.classList.toggle("open");
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const body = document.body;

  if (mobileMenu) {
    mobileMenu.classList.toggle("open");
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.toggle("open");
    }

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("open")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }
}

// Mobile Dropdown Toggle
function toggleMobileDropdown(button) {
  const dropdownContent = button.parentElement.nextElementSibling;
  const isOpen = dropdownContent.classList.contains("open");

  // Close all other dropdowns
  document
    .querySelectorAll(".mobile-dropdown-content.open")
    .forEach((content) => {
      content.classList.remove("open");
    });
  document
    .querySelectorAll(".mobile-dropdown-toggle.open")
    .forEach((toggle) => {
      toggle.classList.remove("open");
    });

  // Toggle current dropdown
  if (!isOpen) {
    dropdownContent.classList.add("open");
    button.classList.add("open");
  }
}

// Color Change Functionality
function changeColor(primary, secondary) {
  document.documentElement.style.setProperty("--primary-color", primary);
  document.documentElement.style.setProperty("--secondary-color", secondary);

  // Update active color option
  document.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("active");
  });
  event.target.classList.add("active");

  localStorage.setItem("primaryColor", primary);
  localStorage.setItem("secondaryColor", secondary);
}

// Font Change Functionality
function changeFont(fontType) {
  let fontFamily;
  switch (fontType) {
    case "serif":
      fontFamily = "Georgia, serif";
      break;
    case "mono":
      fontFamily = "'Courier New', monospace";
      break;
    default:
      fontFamily =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }

  document.body.style.fontFamily = fontFamily;

  // Update active font option
  document.querySelectorAll(".font-option").forEach((option) => {
    option.classList.remove("active");
  });
  event.target.classList.add("active");

  localStorage.setItem("fontFamily", fontFamily);
}

// Close sidebar when clicking outside
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("customizeSidebar");
  const customizeBtn = document.querySelector(".customize-btn");

  if (!sidebar.contains(event.target) && !customizeBtn.contains(event.target)) {
    sidebar.classList.remove("open");
  }
});

// Load saved preferences
document.addEventListener("DOMContentLoaded", function () {
  // Load theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Load colors
  const savedPrimaryColor = localStorage.getItem("primaryColor");
  const savedSecondaryColor = localStorage.getItem("secondaryColor");
  if (savedPrimaryColor && savedSecondaryColor) {
    document.documentElement.style.setProperty(
      "--primary-color",
      savedPrimaryColor
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      savedSecondaryColor
    );
  }

  // Load font
  const savedFont = localStorage.getItem("fontFamily");
  if (savedFont) {
    document.body.style.fontFamily = savedFont;
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "var(--bg-white)";
    header.style.backdropFilter = "none";
  }
});

// Add animation on scroll for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards for animation
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".service-item, .project-card, .home-project-card, .advice-card, .pricing-card"
  );
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});
